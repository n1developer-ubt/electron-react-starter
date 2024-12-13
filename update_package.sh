#!/bin/bash

# Check for correct number of arguments
if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <new_project_name> <new_version> <new_author> <new_description>"
    exit 1
fi

NEW_NAME=$1
NEW_VERSION=$2
NEW_AUTHOR=$3
NEW_DESCRIPTION=$4

# Transformations
NAME_LOWER=$(echo "$NEW_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
NAME_UPPER=$(echo "$NEW_NAME" | tr '[:lower:]' '[:upper:]')
PRODUCT_NAME=$NEW_NAME
APP_ID="com.$NAME_LOWER.qg"
SHORTCUT_NAME=$NEW_NAME

PACKAGE_FILE="package.json"

# Verify that package.json exists
if [ ! -f "$PACKAGE_FILE" ]; then
    echo "Error: $PACKAGE_FILE not found!"
    exit 1
fi

# Update package.json fields using jq
jq --arg name "$NAME_LOWER" \
   --arg version "$NEW_VERSION" \
   --arg author "$NEW_AUTHOR" \
   --arg description "$NEW_DESCRIPTION" \
   --arg productName "$PRODUCT_NAME" \
   --arg appId "$APP_ID" \
   --arg protocolName "$NEW_NAME" \
   --arg shortcutName "$SHORTCUT_NAME" \
   '.name = $name | .version = $version | .author = $author | .description = $description | .build.productName = $productName | .build.appId = $appId | .build.protocols.name = $protocolName | .build.nsis.shortcutName = $shortcutName' \
   "$PACKAGE_FILE" > temp.json && mv temp.json "$PACKAGE_FILE"

echo "Updated package.json with the following values:"
echo "Name: $NAME_LOWER"
echo "Version: $NEW_VERSION"
echo "Author: $NEW_AUTHOR"
echo "Description: $NEW_DESCRIPTION"
echo "Product Name: $PRODUCT_NAME"
echo "App ID: $APP_ID"
echo "Protocol Name: $NEW_NAME"
echo "Shortcut Name: $SHORTCUT_NAME"
