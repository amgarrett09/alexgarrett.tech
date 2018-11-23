#This part is necessary for any stand-alone script that wishes to use Django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','blog_project.settings')
import django
django.setup()

from blog.models import Post

def populate_posts(n):
    """
    This takes a number 'n' and creates n new Post objects (if they don't
    already exist), with a single number 'i' in all required fields. That
    number 'i' increments from 0 to n. Basically this just creates some dummy
    posts.
    """

    if type(n) == type(1):
        for i in range(n):
            post, created = Post.objects.get_or_create(
                title=i, slug=i, body=i, description=i
            )
    else:
        print("Please call this function with an integer.")

if __name__ == '__main__':
    populate_posts(10)