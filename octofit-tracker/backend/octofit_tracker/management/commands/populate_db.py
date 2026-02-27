from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from pymongo import MongoClient

# Sample data for superheroes
USERS = [
    {"username": "superman", "email": "superman@dc.com", "team": "dc"},
    {"username": "batman", "email": "batman@dc.com", "team": "dc"},
    {"username": "wonderwoman", "email": "wonderwoman@dc.com", "team": "dc"},
    {"username": "ironman", "email": "ironman@marvel.com", "team": "marvel"},
    {"username": "spiderman", "email": "spiderman@marvel.com", "team": "marvel"},
    {"username": "captainmarvel", "email": "captainmarvel@marvel.com", "team": "marvel"},
]

TEAMS = [
    {"name": "marvel", "members": ["ironman", "spiderman", "captainmarvel"]},
    {"name": "dc", "members": ["superman", "batman", "wonderwoman"]},
]

ACTIVITIES = [
    {"user": "superman", "activity": "flying", "duration": 60},
    {"user": "batman", "activity": "training", "duration": 90},
    {"user": "ironman", "activity": "engineering", "duration": 120},
]

LEADERBOARD = [
    {"user": "superman", "score": 1000},
    {"user": "ironman", "score": 950},
    {"user": "batman", "score": 900},
]

WORKOUTS = [
    {"name": "strength", "suggestion": "Lift heavy objects"},
    {"name": "agility", "suggestion": "Dodge obstacles"},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Insert test data
        db.users.insert_many(USERS)
        db.teams.insert_many(TEAMS)
        db.activities.insert_many(ACTIVITIES)
        db.leaderboard.insert_many(LEADERBOARD)
        db.workouts.insert_many(WORKOUTS)

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
