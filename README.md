A simple **Book Management System** built with **Next.js**, **React**, **Bootstrap**, and **Local Storage**. This application allows users to perform CRUD (Create, Read, Update, Delete) operations on books and includes client-side form validation and pagination.

---

## 🚀 Features

* ➕ Add a new book
* 📖 View all books
* ✏️ Edit existing book details
* 🗑️ Delete books
* 💾 Data persistence using Local Storage
* ✅ Form validation
* 📄 Pagination
* 📱 Responsive UI with Bootstrap

---

## 🛠️ Technologies Used

* Next.js 15
* React
* Bootstrap 5
* JavaScript (ES6+)
* HTML5
* CSS3
* Local Storage API

---

## 📂 Project Structure

```
book-management/
│
├── app/
│   ├── layout.jsx# 📚 Book Management System

│   ├── page.jsx
│
├── public/
│
├── package.json
├── README.md
└── next.config.js
```

---

## 📋 Form Fields

Each book contains the following information:

* Book Image URL
* Book Title
* Author
* Category
* Price
* Description

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-management.git
```

### 2. Navigate to the project folder

```bash
cd book-management
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will run at:

```
http://localhost:3000
```

---

## 📖 Usage

### Add Book

1. Fill in all required fields.
2. Click the **Submit** button.
3. The book will be saved in Local Storage and displayed in the table.

### Edit Book

1. Click the **Edit** button.
2. Update the required information.
3. Click **Update Book**.

### Delete Book

1. Click the **Delete** button.
2. The selected book will be removed from the list.

---

## 💾 Local Storage

The application stores data inside the browser using:

```javascript
localStorage.setItem("book-list", JSON.stringify(newList));
```

Books are automatically loaded when the application starts.

---

## 📄 Pagination

* Displays **5 books per page** by default.
* Previous and Next navigation.
* Dynamic page numbers.

---

## ✅ Validation

The following fields are required:

* Book Image URL
* Book Title
* Author
* Category
* Price
* Description

If any field is empty, an error message is displayed below the corresponding input.

---

## 📸 Screenshots

Add screenshots here after running the project.

Example:

```
screenshots/
    home.png
    add-book.png
    edit-book.png
```

---

## 🔮 Future Improvements

* Search books
* Filter by category
* Sort by title or price
* Image upload instead of URL
* Dark mode
* Backend integration (MongoDB/MySQL)
* Authentication
* Toast notifications
* Confirmation dialog before deleting
