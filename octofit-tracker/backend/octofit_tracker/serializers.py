from rest_framework import serializers
from .models import User, Team, Activity, LeaderboardEntry, Workout

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'created_at']

class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration', 'calories_burned', 'date', 'team']

class LeaderboardEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    team_name = serializers.SerializerMethodField()

    def get_team_name(self, obj):
        return obj.team.name if obj.team else None

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'team', 'total_points', 'user_name', 'team_name']

class WorkoutSerializer(serializers.ModelSerializer):
    suggested_for = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'suggested_for']
