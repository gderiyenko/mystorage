# My Storage for Chrome:Brave:Edge (chromium-based browsers)

Cross-website key-value storage accessible from any browser console

**mystorage** is a Chrome extension that provides a simple, universal storage API accessible from any website's console. Unlike localStorage (which is domain-specific), mystorage lets you store and retrieve data across all your tabs and websites.

## ✨ Features

- 🌐 **Cross-domain storage** - Share data between different websites
- 🎯 **Simple API** - Three intuitive methods: get, set, delete
- 💻 **Console accessible** - Use from any browser console, anywhere
- 🎨 **Beautiful UI** - Manage your stored data with an elegant popup interface
- ⚡ **Instant sync** - Data is immediately available across all tabs


## Usage Examples

Open the console on any website (F12 or Cmd+Option+J) and use these commands:

```javascript
// Store a value
await mystorage.set("ping", "pong")
await mystorage.set("user", { name: "Alice", age: 30 })


// Retrieve a value
await mystorage.get("ping")
await mystorage.get("user")

// Delete a value
await mystorage.delete("ping")
await mystorage.delete("user")
```

All operations return promises, so remember to use `await` or `.then()`.

## 🌤️ Popup Preview

The extension includes a beautiful popup interface with three tabs:

- **Storage** - View and manage all stored key-value pairs
- **Add Item** - Quickly add new records manually through a form
- **Console** - Info and reference for console commands
  
<img src="/img/demo.png" alt="Demo Preview">



## Installation

🛍️ From marketplace:
https://chromewebstore.google.com/detail/lgachdopaejincmgchbneodepkdhckhc?utm_source=item-share-cb

Or manually, from this GitHub Repo:

1. Clone this repository or download the ZIP
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The mystorage icon will appear in your toolbar


## Use Cases
Where This is Valuable:

Developer workflows - Quickly test/share data across multiple dev environments
Cross-site coordination - Pass tokens, preferences, or state between your own sites
Testing & debugging - Store test data accessible from any tab
Personal utilities - Keep notes, snippets, or temporary data while browsing
Browser automation - Scripts that need to coordinate across tabs/domains


## We Value Your Privacy & Security!

- All data is **stored locally** in your browser using Chrome's storage API
- No data is sent to external servers
- Data persists across browser sessions

## Technical Details

- Built with vanilla JavaScript
- Uses `chrome.storage.local` for data persistence
- Content script injection for console API access
- Manifest V3 compatible


## 🤝 Contributing

Contributions are welcome!

Have questions or suggestions? Open an issue:
- Submit issues, bug reports and feature requests to the current repo [https://github.com/gderiyenko/mystorage/issues/new].

Want to contribute?
- Fork it and Open a Pull Request to `dev` branch with improvements referenced to any existing issues.


If you find mystorage useful, consider supporting its development:
- 💝 [Buy me a coffee](https://buymeacoffee.com/gderiyenko)

---

Made with ❤️ for developers who need simple, universal browser storage.

(c) MIT License - feel free to use, modify, and distribute as you wish.
