# INFOLENS:

1. What Are We Building?
We are building a web application that helps content creators collect information from different sources and quickly understand it using AI.
Instead of opening many articles and watching long videos manually, the user can add content to the application. The application extracts the useful information and shows it in a simple dashboard.
The main idea is: Add content → AI analyzes it → User understands it → User gets ideas for new content.
2. Why Do We Need This?
Content creators often research the same topic across many websites, blogs, RSS feeds, and YouTube videos. This takes time and makes it difficult to remember or search for old research.
Too much information is available.
Reading and watching everything takes time.
Important points can be missed.
Research becomes scattered across browser tabs and notes.
Finding previously researched content is difficult.
Creators need ideas for what to create next.
3. Our Solution
The platform will keep content and its AI-generated analysis in one place. Users can add an article URL, YouTube URL, or RSS feed. The system processes the content and displays a short summary, key points, topics, keywords, and content ideas.
The goal is not to replace the creator. The goal is to reduce research time and make information easier to understand.
4. Project Goals
Create one simple place for content research.
Use an existing AI API instead of building our own AI model.
Automatically summarize submitted content.
Extract important points, topics, and keywords.
Suggest possible content ideas.
Allow users to search and filter their saved content.
Provide a clean dashboard showing recently analyzed content and popular topics.
Keep the project simple enough to complete and demonstrate properly.


5. Target Users
User
What They Want
Content Creator
Quickly understand topics and find ideas.
Student/Researcher
Save and search research material.
Small Editorial Team
Organize articles and videos in one place.

6. Main Features
6.1 User Authentication
Users can create an account and log in. Their saved content should belong only to their account.
Register
Login
Logout
Protected pages
Basic profile/settings
6.2 Add Content
The user can add content through a simple form.
Article URL
YouTube URL
RSS feed URL
The system should identify the type of source and start processing it.
6.3 Article Processing
For an article URL, the backend attempts to extract the useful page information such as title, author, publication date, source URL, and readable text.
If extraction fails, the application should show a clear error instead of pretending the content was processed.
6.4 YouTube Processing
For a YouTube URL, the application uses an available transcript/caption source when possible. The transcript is then sent to the AI service for analysis.
If a transcript is unavailable, the user should see a message such as 'Transcript not available for this video.'
6.5 RSS Feed
Users can add an RSS feed. The application reads the feed and saves its article entries. The user can then open an entry and request/view its AI analysis.
For the MVP, RSS does not need to become a complicated automatic monitoring system. A simple 'Fetch Latest' action is enough.
6.6 AI Analysis
This is the main feature of the project. We will use an existing AI API.
For each content item, the AI should generate:
Short summary
3–7 key points
Topics
Important keywords
2–5 possible content ideas
Optional later addition: simple sentiment such as Positive, Neutral, or Negative.
6.7 Content Detail Page
When the user opens a content item, they should see the original information and the AI analysis together.
Title
Source
Original URL
Date
Content type
Summary
Key points
Topics
Keywords
Content ideas
6.8 Search and Filter
The user should be able to find old research without scrolling through everything.
Search by title or keyword
Filter by content type
Filter by topic
Filter by date
Sort by newest/oldest
6.9 Simple Dashboard
The dashboard gives the user a quick overview of their research.
Total saved content
Articles
YouTube videos
RSS items
Recently analyzed content
Most common topics
Quick Add Content button
The dashboard should be useful, not overloaded with charts.
6.10 Saved Content / Archive
Every successfully processed item is stored so that the user can return to it later. The archive is simply the user's searchable research library.
7. Simple User Flow
User registers or logs in.
User opens the dashboard.
User clicks 'Add Content'.
User pastes an article URL, YouTube URL, or RSS URL.
Backend validates the URL.
Backend extracts the content or transcript.
Backend sends the useful text to the AI API.
AI returns structured analysis.
Backend saves the content and analysis in MongoDB.
User sees the result on the content detail page.
User can search it later or use the generated ideas.
8. Pages We Need
Page
Purpose
Login
User login
Register
Create account
Dashboard
Overview and recent content
Add Content
Submit article/YouTube/RSS URL
Content Library
Search and filter saved content
Content Details
Read source information and AI analysis
Settings
Basic account settings

9. Simple Technical Architecture
The project follows the MERN stack.
Frontend: React. Backend: Node.js + Express. Database: MongoDB. AI: Existing AI API.
Basic flow:
React → Express API → Content extraction → AI API → MongoDB → React
The frontend should never contain the AI API key. AI calls happen on the backend.
10. Suggested Backend Modules
auth — registration and login
content — add, retrieve, update, delete content
source — source/RSS handling
ai — AI API communication and response validation
search — content search/filtering
dashboard — simple statistics
These can be normal Express routes/services. We do not need a complicated microservice architecture.
11. Basic Database Design
Collection
Main Fields
User
name, email, passwordHash, createdAt
Content
userId, type, title, url, source, text/transcript, publishedAt, status, createdAt
Analysis
contentId, summary, keyPoints, topics, keywords, ideas, createdAt
Source
userId, type, name, url, createdAt

For simplicity, Analysis can also be embedded inside Content. The final implementation can choose either approach. The important thing is to keep the relationship easy to understand.
12. Basic API Endpoints
Method
Endpoint
Purpose
POST
/api/auth/register
Register user
POST
/api/auth/login
Login
POST
/api/auth/logout
Logout
GET
/api/content
Get user's content
POST
/api/content
Add/process content
GET
/api/content/:id
Get one content item
DELETE
/api/content/:id
Delete content
POST
/api/content/:id/analyze
Run/re-run AI analysis
GET
/api/sources
Get user's sources
POST
/api/sources
Add RSS/source
POST
/api/sources/:id/fetch
Fetch latest RSS items
GET
/api/dashboard
Dashboard statistics

13. AI Response Format
The backend should ask the AI API to return structured JSON rather than uncontrolled paragraphs.
Example:
{
  "summary": "...",
  "keyPoints": ["...", "..."],
  "topics": ["AI", "Technology"],
  "keywords": ["agents", "automation"],
  "contentIdeas": ["...", "..."]
}
The backend validates the response before saving it. If the response is invalid, the application should show a processing error and allow the user to retry.
14. Error Handling
Problem
What User Sees
Invalid URL
Please enter a valid supported URL.
Article cannot be extracted
We could not read this article.
YouTube transcript unavailable
Transcript is not available.
RSS feed invalid
This RSS feed could not be loaded.
AI API failure
Analysis failed. Try again.
Content not found
This content no longer exists.

15. Security Basics
Hash passwords securely.
Protect private API routes.
Check that a content item belongs to the logged-in user before returning or deleting it.
Keep AI/API keys in environment variables.
Validate incoming URLs and request data.
Do not expose secrets in frontend code.
16. MVP Acceptance Criteria
A user can register and log in.
A logged-in user can add an article URL.
The application can store the extracted article information when extraction succeeds.
A user can add a supported YouTube URL when a transcript is available.
A user can add an RSS feed and fetch its entries.
AI analysis generates a summary, key points, topics, keywords, and content ideas.
Results are stored in MongoDB.
Users can open previously analyzed content.
Users can search and filter their content.
The dashboard shows basic content counts and recent items.
Users cannot access another user's content.
AI/API keys are not exposed in the React application.
17. Development Plan
Stage
Work
1
Set up React, Express, MongoDB and project structure
2
Build register/login/logout
3
Build Add Content UI and article URL processing
4
Connect AI API and generate analysis
5
Build content library and detail page
6
Add YouTube transcript processing
7
Add RSS feed support
8
Build dashboard
9
Add search/filter
10
Testing, UI polish and deployment

18. Testing
Test registration and login.
Test invalid URLs.
Test article extraction success/failure.
Test YouTube transcript available/unavailable cases.
Test RSS valid/invalid cases.
Test AI success/failure.
Test search and filters.
Test authorization so users cannot access each other's content.
Test the complete flow from adding a URL to viewing AI results.
19. Future Features
These features can be added after the MVP is complete:
Automatic RSS updates.
Trending topics.
Similar article detection.
Story clustering.
Semantic/vector search.
Social media sources.
Browser extension.
Team workspaces.
Content calendar.
AI-generated full content briefs.
Notifications for important topics.
20. Final One-Line Description
ContentLens is an AI-powered content research platform that collects articles, YouTube content, and RSS feeds, summarizes them, extracts key information, and helps users discover ideas through a simple searchable dashboard.
21. Final MVP Philosophy
Keep the project focused. The success of this project is not measured by how many advanced technologies we put into it. It is measured by whether a user can add content, understand it quickly, find it later, and get useful ideas from it.
Build the simple version first. Only add advanced features after the core workflow is stable.

