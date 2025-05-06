# Callbell Mobile Test

Hi there 👋 Thanks for taking the time to do this test! We hope that you're going to have fun!

The goal here is to allow you to build an MVP of our Callbell Mobile app.

We'll discuss your work (choices, code syntax, mistakes if there are some, etc.) during a review call after you have completed the assignment.

⚠️ **Carefully read all the instructions, then give yourself a limited time.**

If you struggle to finish it, value your time and don't spend days on it. Just submit your best effort.

⚠️ If you think something is wrong with the test (doesn't run as expected, missing instructions, ...), please email me at [gianluca@callbell.eu](mailto:gianluca@callbell.eu).

## 🚀 Objectives

The goal of this mobile test is to assess your skills on:

- Installing and running an Expo development environment;
- Making API calls to third-party services;
- Creating user friendly interface
- Creating a cross platform app
- Writing unit tests;
- Understanding of data management
- Following instructions and looking for answers in documentations.

## ☑️ Requirements

The application should have three main screens:

1. **Conversations List Screen** (`/`)

   - Display a list of conversations fetched from the Callbell API
   - Each conversation should display the contact name, a contact picture and the last message received
   - Each conversation should be clickable
   - Should navigate to the chat screen when a conversation is selected

2. **Chat Screen** (`/chat`)

   - Display the conversation messages fetched from the Callbell API
   - Show conversation history
   - Should have a way to navigate to contact details

3. **Contact Details Screen** (`/contact`)
   - Display contact information fetched from the Callbell API
   - Show contact name, notes, and other metadata
   - Should allow contact name update
   - Should have a way to navigate back to conversations

## ⚙️ Technical Requirements

- Use React Native with Expo
- Implement proper navigation between screens
- Integrate with the Callbell API (https://docs.callbell.eu/api/reference/introduction)
- Handle data management (you can choose any approach: Context API, Redux, etc.)
- Implement proper error handling
- Ensure good UX/UI practices
- Implement basic tests (we provide you with Jest in the package.json, but feel free to use any tool you prefer)

## Bonus

If you have time you can go the extra miles and implement the following:

- Allow deleting a conversation/message
- Implement more advanced tests (E2E, snapshots etc)

## 🧰 API Integration

The project includes a skeleton structure for API integration in the `src/api` directory for your convenience. But feel free to change it the way you want !

- `config.js`: Contains API configuration (base URL and API key)
- `client.js`: Basic API client implementation
- `services/`: Directory containing service implementations for:
  - `conversations.js`: Conversation-related API calls
  - `messages.js`: Message-related API calls
  - `contacts.js`: Contact-related API calls

## 📦 Installing the project

In order to run the expo app locally you'll need:

- nvm (optional)
- node 20.11.1
- react 19.1.0

### Configuration

You can manage your local npm installation by using `nvm`. Here's instructions on how to get it running:

**1. Clone the repository**

```bash
git clone git@github.com:callbellchat/callbell-mobile-assignment.git
```

**2. Install npm**

This part is important, make sure you have the right node version before going further. We use "nvm" to handle our node version. But you can use any tool you prefer of course.

```bash
nvm install 20.11.1
```

You can also uninstall previous versions of node if you don't need them:

```bash
nvm uninstall 16.13.0
```

**3. Use specific node version**

```bash
cd callbell-mobile-assignment
nvm use
```

**4. Install dependencies**

```bash
npm install
```

**5. Add your Callbell API key to `.envrc`**

Add the API key we've sent you by email in your ".envrc" file

```
export CALLBELL_API_KEY=your_api_key
```

**6. Start expo server:**

```bash
npx expo start
```

**4. Open the app on your device or emulator**

## 🗒 Notes

- The current codebase provides only the basic structure and navigation
- You are free to implement the logic and data management as you see fit
- Focus on clean code, proper architecture, and good practices
- Add any necessary dependencies you need
- Feel free to modify the UI/UX as long as the core functionality remains the same

---

## 📪 Once you're done

Send me an email at [gianluca@callbell.eu](mailto:gianluca@callbell.eu) with subject `[Mobile Test]`, and containing:

- either a link to the GitHub repository of your project (if you want to keep it private, add [@proudlygeek](http://github.com/proudlygeek) as collaborator),
- **OR** a ZIP **WITHOUT the `node_modules` folder**;
- **your next availabilities** so I can schedule a review call with you.

**Thanks for participating, have fun!**  
_Gianluca, CTO at Callbell_
