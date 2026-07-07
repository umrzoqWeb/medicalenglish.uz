#!/bin/bash

echo "🚀 English for Medical Students - Deployment Script"
echo "=================================================="

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "🗄️ Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Seed database (optional - uncomment if needed)
# echo "🌱 Seeding database..."
# python manage.py seed_data

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "To run the server:"
echo "  Development: python manage.py runserver 0.0.0.0:8000"
echo "  Production:  gunicorn config.wsgi:application --bind 0.0.0.0:8000"
echo ""
echo "Don't forget to:"
echo "  1. Set SECRET_KEY in .env file"
echo "  2. Set OPENAI_API_KEY in .env file (for AI evaluation)"
echo "  3. Set DEBUG=False for production"
