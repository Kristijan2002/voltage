# Firebase Setup for Client-Side Data Access

This guide explains how to set up Firebase to allow client-side access to services, projects, and FAQs data.

## 1. Firebase Security Rules

The `firestore.rules` file contains security rules that allow:
- **Public read access** to services, projects, and FAQs (for client-side display)
- **Authenticated write access** only (for admin management)

## 2. Deploy Security Rules

To deploy the security rules to Firebase:

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Deploy the security rules
firebase deploy --only firestore:rules
```

## 3. Verify Rules in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`voltage-21fc6`)
3. Go to Firestore Database → Rules
4. Verify the rules are deployed correctly

## 4. Test Client-Side Access

The client-side application should now be able to:
- Fetch services from `/services` collection
- Fetch projects from `/projects` collection  
- Fetch FAQs from `/faqs` collection

All without requiring user authentication.

## 5. Admin Operations

Admin operations (create, update, delete) still require authentication:
- Users must be logged in to modify data
- This ensures data security while allowing public read access

## 6. Troubleshooting

If you encounter permission errors:

1. **Check Firebase Console**: Ensure rules are deployed
2. **Verify Collection Names**: Collections must be exactly `services`, `projects`, `faqs`
3. **Check Network Tab**: Look for 403 Forbidden errors
4. **Console Logs**: Check browser console for detailed error messages

## 7. Data Structure

Ensure your Firestore documents have the correct structure as defined in `types/data.ts`:

- **Services**: Must include `title`, `description`, `details`, etc.
- **Projects**: Must include `title`, `category`, `description`, etc.
- **FAQs**: Must include `question`, `answer`

## 8. Environment Variables

Your `.env.local` file should contain:
```
```

## 9. Testing

After setup, test the application:
1. Visit the homepage
2. Check browser console for successful Firebase connections
3. Verify services, projects, and FAQs are loaded from Firebase
4. Test admin functions (requires login)

## 10. Security Notes

- **Public read access** means anyone can view your data
- **Write protection** ensures only authenticated admins can modify data
- Consider implementing rate limiting for production use
- Monitor Firebase usage and costs
