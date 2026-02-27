#!/bin/bash
# Setup script for OctoFit Tracker Frontend

echo "========================================="
echo "OctoFit Tracker Frontend Setup"
echo "========================================="

# Check if running in Codespaces
if [ -n "$CODESPACE_NAME" ]; then
    echo "✓ Running in GitHub Codespaces"
    echo "  Codespace Name: $CODESPACE_NAME"
    
    # Create .env file with CODESPACE_NAME
    echo "REACT_APP_CODESPACE_NAME=$CODESPACE_NAME" > .env
    echo "✓ Created .env file with REACT_APP_CODESPACE_NAME"
    
    # Display the backend URL
    BACKEND_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
    echo "✓ Backend API URL: $BACKEND_URL"
else
    echo "⚠ Not running in GitHub Codespaces"
    echo "  Using localhost:8000 as backend URL"
    
    # Create .env with comment
    cat > .env << 'EOF'
# Running locally - using localhost as backend
# REACT_APP_CODESPACE_NAME=
EOF
    echo "✓ Created .env file for local development"
fi

echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "To start the frontend:"
echo "  npm install"
echo "  npm start"
echo ""
echo "The app will be available at:"
if [ -n "$CODESPACE_NAME" ]; then
    echo "  https://${CODESPACE_NAME}-3000.app.github.dev"
else
    echo "  http://localhost:3000"
fi
echo ""
