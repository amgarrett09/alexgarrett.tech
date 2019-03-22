from django import forms
from blog.models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'slug', 'category', 'body', 'description']

class EmailForm(forms.Form):
    your_email = forms.EmailField(required=True)
    subject = forms.CharField(required=True)
    body = forms.CharField(widget=forms.Textarea, required=True)
