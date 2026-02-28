from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, LeaderboardEntry, Workout

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data using Django ORM
        LeaderboardEntry.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        # Create users
        users = {}
        user_data = [
            {"username": "superman", "email": "superman@dc.com"},
            {"username": "batman", "email": "batman@dc.com"},
            {"username": "wonderwoman", "email": "wonderwoman@dc.com"},
            {"username": "ironman", "email": "ironman@marvel.com"},
            {"username": "spiderman", "email": "spiderman@marvel.com"},
            {"username": "captainmarvel", "email": "captainmarvel@marvel.com"},
        ]
        for ud in user_data:
            user = User.objects.create_user(
                username=ud["username"],
                email=ud["email"],
                password="fitness123"
            )
            users[ud["username"]] = user

        # Create teams
        dc_team = Team.objects.create(name="dc")
        marvel_team = Team.objects.create(name="marvel")

        # Create leaderboard entries using correct field name: total_points
        leaderboard_data = [
            {"user": "superman", "team": dc_team, "total_points": 1000},
            {"user": "ironman", "team": marvel_team, "total_points": 950},
            {"user": "batman", "team": dc_team, "total_points": 900},
        ]
        for lb in leaderboard_data:
            LeaderboardEntry.objects.create(
                user=users[lb["user"]],
                team=lb["team"],
                total_points=lb["total_points"]
            )

        # Create activities
        activity_data = [
            {"user": "superman", "activity_type": "flying", "duration": 60, "calories_burned": 500, "date": "2024-01-01", "team": dc_team},
            {"user": "batman", "activity_type": "training", "duration": 90, "calories_burned": 700, "date": "2024-01-01", "team": dc_team},
            {"user": "ironman", "activity_type": "engineering", "duration": 120, "calories_burned": 300, "date": "2024-01-01", "team": marvel_team},
        ]
        for ad in activity_data:
            Activity.objects.create(
                user=users[ad["user"]],
                activity_type=ad["activity_type"],
                duration=ad["duration"],
                calories_burned=ad["calories_burned"],
                date=ad["date"],
                team=ad["team"],
            )

        # Create workouts
        workout_data = [
            {"name": "strength", "description": "Lift heavy objects"},
            {"name": "agility", "description": "Dodge obstacles"},
        ]
        for wd in workout_data:
            Workout.objects.create(
                name=wd["name"],
                description=wd["description"],
            )

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
