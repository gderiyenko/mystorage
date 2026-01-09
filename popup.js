document.addEventListener("DOMContentLoaded", () => {
  const storageContainer = document.getElementById("storage-container");
  const addForm = document.getElementById("add-form");

  
  // Add new key-value pair
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newKey = document.getElementById("new-key").value;
    let newValue = document.getElementById("new-value").value;

    if (newKey) {
      try {
        newValue = JSON.parse(newValue);
      } catch (e) {
        // Keep it as a string if it's not valid JSON
      }

      chrome.runtime.sendMessage(
        { type: "MYSTORAGE_SET", key: newKey, value: newValue },
        () => {
          addForm.reset();
          refreshData();
          // navigate to Storage (1 tab)
           document.querySelectorAll(".tab")[0].click();
        },
      );
    }
  });

  // Edit
  storageContainer.addEventListener("storage-update", (e) => {
    chrome.runtime.sendMessage(
      {
        type: "MYSTORAGE_SET",
        key: e.detail.key,
        value: e.detail.value,
      },
      () => {
        refreshData();
      },
    );
  });
  
  // Remove 
  storageContainer.addEventListener("storage-remove", (e) => {
    chrome.runtime.sendMessage(
      {
        type: "MYSTORAGE_REMOVE",
        key: e.detail.key,
      },
      () => {
        refreshData();
      },
    );
  });
  


  const refreshData = () => {
    chrome.runtime.sendMessage({ type: "GET_ALL_STORAGE" }, (response) => {
      storageContainer.innerHTML = "";

      if (response && response.data && Object.keys(response.data).length > 0) {
        const storageList = document.createElement("div");
        storageList.className = "storage-list";

        for (const [key, value] of Object.entries(response.data)) {
          const item = document.createElement("storage-item");
          item.setAttribute("data-key", key);
          item.setAttribute("data-value", JSON.stringify(value));
          storageList.appendChild(item);
        }

        storageContainer.appendChild(storageList);
      } else {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = "No records stored yet<br><small>Add your first key-value pair above</small>";
        storageContainer.appendChild(emptyState);
      }
    });
  };



  // Tab switching functionality
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active");
      document.getElementById(`${targetTab}-tab`).classList.add("active");
    });
  });

  refreshData();
});
