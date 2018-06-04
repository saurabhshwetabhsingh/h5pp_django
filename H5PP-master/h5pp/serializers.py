from rest_framework import serializers
from .models import h5p_contents

class h5pcontentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = h5p_contents
		fields = ('content_id','title', 'community_id', 'community_name')