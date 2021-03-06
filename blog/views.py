from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from blog.models import Category, Post
from blog.forms import PostForm, EmailForm
from markdownx.utils import markdownify
from blog.utils import html_escape


def home(request):
    return render(request, 'blog/home.html')


def index(request):
    post_list = Post.objects.filter(published=True)
    categories = Category.objects.all()

    # Pagination
    paginator = Paginator(post_list, 10)
    page = request.GET.get('page', 1)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    for post in posts:
        post.description = markdownify(post.description)

    return render(
        request, 'blog/blog_index.html',
        {'posts': posts, 'categories': categories}
    )


def post(request, slug):
    post = get_object_or_404(Post, slug=slug)
    post.body = markdownify(post.body)
    categories = Category.objects.all()
    return render(request, 'blog/post.html', {'post': post, 'categories': categories})


@login_required(login_url='/admin/login/')
def dashboard(request):
    post_list = Post.objects.filter(published=True)
    draft_list = Post.objects.filter(published=False)
    post_page = request.GET.get('postpage', 1)
    draft_page = request.GET.get('draftpage', 1)

    post_paginator = Paginator(post_list, 10)
    draft_paginator = Paginator(draft_list, 10)

    try:
        published_posts = post_paginator.page(post_page)
    except PageNotAnInteger:
        published_posts = post_paginator.page(1)
    except EmptyPage:
        published_posts = post_paginator.page(post_paginator.num_pages)

    try:
        drafts = draft_paginator.page(draft_page)
    except PageNotAnInteger:
        drafts = draft_paginator.page(1)
    except EmptyPage:
        drafts = draft_paginator.page(draft_paginator.num_pages)

    return render(
        request, 'blog/dashboard.html',
        {'published_posts': published_posts, 'drafts': drafts}
    )


@login_required(login_url='/admin/login/')
def compose(request):
    if request.method == "POST":
        form = PostForm(request.POST)

        if form.is_valid():
            title = form.cleaned_data['title']
            category = form.cleaned_data['category']
            slug = form.cleaned_data['slug']

            # html escaping
            body = form.cleaned_data['body']
            body = html_escape(body)
            description = form.cleaned_data['description']
            description = html_escape(description)

            post = Post(
                title=title, slug=slug,
                category=category, body=body,
                description=description
            )
            post.save()

            return redirect('blog-dashboard')

    else:
        form = PostForm()

    return render(request, 'blog/compose.html', {'form': form})


@login_required(login_url='/admin/login/')
def edit(request, slug):
    post = get_object_or_404(Post, slug=slug)

    if request.method == "POST":
        form = PostForm(request.POST, instance=post)

        if form.is_valid():
            title = form.cleaned_data['title']
            category = form.cleaned_data['category']
            slug = form.cleaned_data['slug']

            # html escaping
            body = form.cleaned_data['body']
            body = html_escape(body)
            description = form.cleaned_data['description']
            description = html_escape(description)

            post.title = title
            post.category = category
            post.slug = slug
            post.body = body
            post.description = description
            post.save()
            return redirect('blog-dashboard')
    else:
        form = PostForm(instance=post)

    return render(request, 'blog/edit.html', {'form': form})


@login_required(login_url='/admin/login/')
def publish(request, slug):
    post = get_object_or_404(Post, slug=slug)

    if request.method == "POST":
        post.publish()
        return redirect('blog-dashboard')
    else:
        post.body = markdownify(post.body)
        return render(request, 'blog/publish.html', {'post': post})


def category(request, category):
    category = get_object_or_404(Category, slug=category)
    posts = category.post.filter(published=True)

    for post in posts:
        post.description = markdownify(post.description)
    categories = Category.objects.all()

    return render(request, 'blog/category.html', {'category': category, 'posts': posts, 'categories': categories})

# Email contact page
def email(request):
    if request.method == 'POST':
        form = EmailForm(request.POST)
        if form.is_valid():
            sender = form.cleaned_data['your_email']
            subject = form.cleaned_data['subject']
            body = form.cleaned_data['body']

            try:
                send_mail(
                    subject, body, sender, ['agarrettR8@gmail.com'],
                    fail_silently=False,
                )
            except BadHeaderError:
                return HttpResponse('Invalid Header!')
            return redirect('email-success')
    else:
        form = EmailForm()
    return render(request, 'blog/email.html', {'form': form})

# Successs page after sending email
def email_success(request):
    return render(request, 'blog/email-success.html')
