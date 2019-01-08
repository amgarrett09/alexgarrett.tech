from django.db import models
from django.urls import reverse
from django.utils import timezone
from markdownx.models import MarkdownxField

class Category(models.Model):
    title = models.CharField(max_length=128, unique=True)
    slug = models.SlugField(max_length=128, unique=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['title']

    def __str__(self):
        return self.title

    def count_posts(self):
        return self.post.filter(published=True).count()

    def get_absolute_url(self):
        return reverse('blog-category', args=[self.slug])

class Post(models.Model):
    title = models.CharField(max_length=128, unique=True)
    slug = models.SlugField(max_length=128, unique=True)
    category = models.ForeignKey(
        Category, null=True, blank=True, related_name='post',
        on_delete=models.CASCADE
    )
    body = MarkdownxField()
    description = MarkdownxField(max_length=3000)
    published = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog-post', args=[self.slug])

    def get_edit_url(self):
        return reverse('blog-edit-post', args=[self.slug])

    def get_publish_url(self):
        return reverse('blog-publish', args=[self.slug])

    def publish(self):
        self.created = timezone.now()
        self.published = True
        self.save()

