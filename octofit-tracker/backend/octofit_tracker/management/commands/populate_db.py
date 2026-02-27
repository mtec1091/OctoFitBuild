from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone

from octofit_tracker.models import Activity, LeaderboardEntry, Workout

USERS = [
    {"username": "superman", "email": "superman@dc.com"},
    {"username": "batman", "email": "batman@dc.com"},
    {"username": "wonderwoman", "email": "wonderwoman@dc.com"},
    {"username": "ironman", "email": "ironman@marvel.com"},
    {"username": "spiderman", "email": "spiderman@marvel.com"},
    {"username": "captainmarvel", "email": "captainmarvel@marvel.com"},
]

ACTIVITIES = [
    {"user": "superman", "activity_type": "flying", "duration": 60, "calories_burned": 600, "team": "dc"},
    {"user": "batman", "activity_type": "training", "duration": 90, "calories_burned": 700, "team": "dc"},
    {"user": "ironman", "activity_type": "engineering", "duration": 120, "calories_burned": 500, "team": "marvel"},
]

LEADERBOARD = [
    {"user": "superman", "total_points": 1000, "team": "dc"},
    {"user": "ironman", "total_points": 950, "team": "marvel"},
    {"user": "batman", "total_points": 900, "team": "dc"},
]

WORKOUTS = [
    {"name": "strength", "description": "Lift heavy objects", "suggested_for": ["superman", "ironman"]},
    {"name": "agility", "description": "Dodge obstacles", "suggested_for": ["batman", "spiderman"]},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()

        users_by_username = {}
        for user_data in USERS:
            user = User.objects.filter(
                username__startswith=f"{user_data['username']}_",
                id__isnull=False
            ).order_by('-date_joined').first()
            if user:
                users_by_username[user_data["username"]] = user

        today = timezone.now().date()
        for activity_data in ACTIVITIES:
            user = users_by_username.get(activity_data["user"])
            if not user:
                continue
            Activity.objects.get_or_create(
                user=user,
                activity_type=activity_data["activity_type"],
                duration=activity_data["duration"],
                calories_burned=activity_data["calories_burned"],
                date=today,
                team=None,
            )

        for entry_data in LEADERBOARD:
            user = users_by_username.get(entry_data["user"])
            if not user:
                continue
            LeaderboardEntry.objects.get_or_create(
                user=user,
                team=None,
                total_points=entry_data["total_points"],
            )

        for workout_data in WORKOUTS:
            workout = Workout.objects.filter(name=workout_data["name"]).first()
            if workout:
                workout.description = workout_data["description"]
                workout.save()
            else:
                Workout.objects.create(
                    name=workout_data["name"],
                    description=workout_data["description"],
                )

        self.stdout.write(self.style.SUCCESS('octofit_db populated via Django ORM test data.'))
