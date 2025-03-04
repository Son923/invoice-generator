#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Invoice Generator Deployment Script ===${NC}"
echo -e "${YELLOW}This script will help you deploy your Invoice Generator to Vercel${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Vercel CLI is not installed.${NC}"
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install Vercel CLI. Please install it manually with 'npm install -g vercel'${NC}"
        exit 1
    fi
    echo -e "${GREEN}Vercel CLI installed successfully!${NC}"
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}.env.local file not found.${NC}"
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    
    # Prompt for Appwrite credentials
    echo -e "${YELLOW}Please enter your Appwrite endpoint (e.g., https://appwrite.1202design.com/v1):${NC}"
    read appwrite_endpoint
    
    echo -e "${YELLOW}Please enter your Appwrite Project ID:${NC}"
    read project_id
    
    echo -e "${YELLOW}Please enter your Appwrite Database ID:${NC}"
    read database_id
    
    echo -e "${YELLOW}Please enter your Appwrite Invoices Collection ID:${NC}"
    read invoices_collection_id
    
    echo -e "${YELLOW}Do you have a Google AdSense ID? (y/n)${NC}"
    read has_adsense
    
    if [ "$has_adsense" = "y" ]; then
        echo -e "${YELLOW}Please enter your Google AdSense ID:${NC}"
        read adsense_id
        adsense_line="NEXT_PUBLIC_ADSENSE_ID=$adsense_id"
    else
        adsense_line="# NEXT_PUBLIC_ADSENSE_ID=your-adsense-id"
    fi
    
    # Create .env.local file
    cat > .env.local << EOF
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=$appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=$project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=$database_id
NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID=$invoices_collection_id

# Google AdSense (uncomment and add your ID for production)
$adsense_line
EOF
    
    echo -e "${GREEN}.env.local file created successfully!${NC}"
fi

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}Build completed successfully!${NC}"

# Deploy to Vercel
echo -e "${YELLOW}Deploying to Vercel...${NC}"
echo -e "${YELLOW}Do you want to deploy to production? (y/n)${NC}"
read is_production

if [ "$is_production" = "y" ]; then
    echo -e "${YELLOW}Deploying to production...${NC}"
    vercel --prod
else
    echo -e "${YELLOW}Deploying to preview environment...${NC}"
    vercel
fi

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed. Please check the errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Your Invoice Generator is now live on Vercel!${NC}"
echo -e "${YELLOW}Don't forget to set up your environment variables in the Vercel dashboard.${NC}" 