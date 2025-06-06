# 🌟 Quotables

A feature-rich, responsive, and accessible random quote generator built with vanilla JavaScript. This web app delivers inspirational quotes on demand, with options to customize appearance, manage favorites, and even install it as a Progressive Web App (PWA).

## 🚀 Features

### 📝 Quote Display
- **Random Quote Area**: Displays a randomly fetched quote with the author’s name. Defaults to “Unknown” if not provided.
- **Loading Indicator**: Shows a spinner while a new quote is being fetched.

### 🎲 Interaction Controls
- **Generate New Quote**: Button to fetch and display a new quote on demand.
- **Copy to Clipboard**: Instantly copies the quote and author to the clipboard.
- **Share Quote**: Opens the current quote in social networking services for quick sharing (e.g., Twitter, Facebook).

### 💾 Favorites Management
- **Save to Favorites**: Save any displayed quote for later reference.
- **View Favorites**: Displays saved quotes in a modal or a dedicated section.
- **Clear Favorites**: Clears all stored favorite quotes at once.

### 🔄 Auto-Refresh
- **Quote Auto-Refresh Toggle**: Option to automatically fetch new quotes at a user-defined interval (e.g., every 15 or 30 seconds).

### 🎨 Appearance Customization
- **Light/Dark Mode Toggle**: Switch between light and dark themes. User preference is remembered across sessions.
- **Custom Font Selector**: Choose from multiple font styles to personalize text appearance.
- **Color Theme Selector**: Select from predefined color schemes to match your visual preference.

### 🌍 Localization & Search
- **Language Selector**: Choose the display language for quotes (e.g., English, Spanish).
- **Quote Filter/Search**: Filter quotes by author, genre, or keywords via a dropdown or input search field.

### 📱 Responsive & Accessible
- **Mobile-First Layout**: Responsive design optimized for phones, tablets, and desktops.
- **Accessible UI**: Keyboard-friendly navigation, ARIA labels, and high-contrast theme support.

### 💾 PWA Support & Data Portability
- **Installable PWA**: Add the app to your device's home screen and use it offline with cached quotes.
- **Import/Export Favorites**: Export your favorite quotes as a `.json` file or import previously saved data.

---

## 🛠️ Tech Stack

- **HTML5** – Semantic markup
- **CSS3** – Flexbox/Grid, variables, theming
- **JavaScript (ES6+)** – DOM manipulation, async `fetch()`, event handling
- **Fetch API** – For retrieving quotes from public quote APIs
- **LocalStorage** – For storing user preferences and favorite quotes
- **Service Worker** – For PWA capabilities and offline support

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/random-quote-generator.git
   ```
   
2. Navigate into the directory
   ```bash
   cd random-quote-generator
   ```
   
3. Open index.html in your browser (no build required)

## 📄 License
This project is licensed under the GNU License.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📬 Contact
For suggestions or collaboration opportunities, feel free to open an issue or contact the repo maintainer.

"Code is poetry. And sometimes, poetry is code." ✨
