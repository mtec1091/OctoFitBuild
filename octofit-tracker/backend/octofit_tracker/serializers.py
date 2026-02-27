from rest_framework import serializers
from .models import User, Team, Activity, LeaderboardEntry, Workout

class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'created_at']

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration', 'calories_burned', 'date', 'team']

class LeaderboardEntrySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'team', 'total_points']

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    suggested_for = serializers.SerializerMethodField()

    def get_suggested_for(self, obj):
        try:
            return [user.username for user in obj.suggested_for.all() if getattr(user, 'username', None)]
        except Exception:
            return []

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'suggested_for']
