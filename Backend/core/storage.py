import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage

class CKEditor5Storage(FileSystemStorage):
    def __init__(self, *args, **kwargs):
        kwargs['location'] = os.path.join(settings.MEDIA_ROOT, 'uploads')
        kwargs['base_url'] = settings.MEDIA_URL + 'uploads/'
        super().__init__(*args, **kwargs)
