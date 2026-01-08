document.addEventListener('DOMContentLoaded', () => {
  const storageContainer = document.getElementById('storage-container');
  const addForm = document.getElementById('add-form');

  const refreshData = () => {
    chrome.runtime.sendMessage({ type: 'GET_ALL_STORAGE' }, (response) => {
      storageContainer.innerHTML = '';
      
      if (response && response.data && Object.keys(response.data).length > 0) {
        const storageList = document.createElement('div');
        storageList.className = 'storage-list';

        for (const [key, value] of Object.entries(response.data)) {
          const item = document.createElement('div');
          item.className = 'storage-item';

          const itemHeader = document.createElement('div');
          itemHeader.className = 'item-header';

          const keyLabel = document.createElement('div');
          keyLabel.className = 'item-key';
          keyLabel.textContent = key;
          
          const valueContainer = document.createElement('div');
          valueContainer.className = 'item-value';
          valueContainer.textContent = JSON.stringify(value, null, 2);

          const itemActions = document.createElement('div');
          itemActions.className = 'item-actions';

          const editButton = document.createElement('button');
          editButton.className = 'btn-secondary';
          editButton.textContent = 'Edit';

          const removeButton = document.createElement('button');
          removeButton.className = 'btn-danger';
          removeButton.textContent = 'Remove';

          itemActions.appendChild(editButton);
          itemActions.appendChild(removeButton);

          itemHeader.appendChild(keyLabel);
          itemHeader.appendChild(valueContainer);
          itemHeader.appendChild(itemActions);

          item.appendChild(itemHeader);
          item.appendChild(valueContainer);
          storageList.appendChild(item);

          // Remove button handler
          removeButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'MYSTORAGE_REMOVE', key: key }, () => {
              refreshData();
            });
          });

          // Edit button handler
          editButton.addEventListener('click', () => {
            if (editButton.textContent === 'Edit') {
              editButton.textContent = 'Save';
              const currentValue = valueContainer.textContent;
              valueContainer.innerHTML = '<textarea></textarea>';
              const textarea = valueContainer.querySelector('textarea');
              textarea.value = currentValue;
              textarea.focus();
            } else {
              const newStringValue = valueContainer.querySelector('textarea').value;
              let newValue;
              try {
                newValue = JSON.parse(newStringValue);
              } catch (e) {
                newValue = newStringValue;
              }
              chrome.runtime.sendMessage({ type: 'MYSTORAGE_SET', key: key, value: newValue }, () => {
                editButton.textContent = 'Edit';
                refreshData();
              });
            }
          });
        }

        storageContainer.appendChild(storageList);
      } else {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = 'No records stored yet<br><small>Add your first key-value pair above</small>';
        storageContainer.appendChild(emptyState);
      }
    });
  };


  // Add new key-value pair
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newKey = document.getElementById('new-key').value;
    let newValue = document.getElementById('new-value').value;

    if (newKey) {
      try {
        newValue = JSON.parse(newValue);
      } catch (e) {
        // Keep it as a string if it's not valid JSON
      }

      chrome.runtime.sendMessage({ type: 'MYSTORAGE_SET', key: newKey, value: newValue }, () => {
        addForm.reset();
        refreshData();
      });
    }
  });
  
  
  // Tab switching functionality
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });

  refreshData();
});