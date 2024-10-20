const suggestedFriends = [
    { id: 1, name: "Swaraj Shinde", avatar: "./swaraj.jpg", grade: "11th", subject: "Physics" },
    { id: 2, name: "Zara Khan", avatar: "./zarakhan.jpg", grade: "12th", subject: "Chemistry" },
    { id: 3, name: "Aarav Patel", avatar: "./Aravpatel.jpg", grade: "11th", subject: "Mathematics" },
  ];
  
  const friendRequests = [
    { id: 4, name: "Taha Sayed", avatar: "./taha.jpg", grade: "12th", subject: "Biology" },
    { id: 5, name: "Prakyat", avatar: "./prakyat.jpg", grade: "11th", subject: "Computer " },
  ];
  
  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    console.log("Searching for:", query);
  }
  
  function handleAddFriend(id) {
    console.log("Adding friend with ID:", id);
  }
  
  function handleAcceptRequest(id) {
    console.log("Accepting request from ID:", id);
  }
  
  
  function renderFriends() {
    const suggestedFriendsList = document.getElementById('suggestedFriendsList');
    suggestedFriends.forEach(friend => {
      const li = document.createElement('li');
      li.classList.add('flex', 'items-center', 'justify-between');
      li.innerHTML = `
        <div class="flex items-center space-x-3">
          <img src="${friend.avatar}" alt="${friend.name}" width="50" height="50" class="avatar">
         
          <div>
            <p class="font-medium">${friend.name}</p>
            <p class="text-sm text-gray-500">${friend.grade} • ${friend.subject}</p>
          </div>
        </div>
        <button onclick="handleAddFriend(${friend.id})" class="button">Add</button>
      `;
      
     // Set height to 200px
      suggestedFriendsList.appendChild(li);
    });
  }
  
  function renderFriendRequests() {
    const friendRequestsList = document.getElementById('friendRequestsList');
    friendRequests.forEach(request => {
      const li = document.createElement('li');
      li.classList.add('flex', 'items-center', 'justify-between');
      li.innerHTML = `
        <div class="flex items-center space-x-3">
          <img src="${request.avatar}" alt="${request.name}" class="avatar">
          <div>
            <p class="font-medium">${request.name}</p>
            <p class="text-sm text-gray-500">${request.grade} • ${request.subject}</p>
          </div>
        </div>
        <button onclick="handleAcceptRequest(${request.id})" class="button">Accept</button>
      `;
      friendRequestsList.appendChild(li);
    });
  }
  
  document.getElementById('searchForm').addEventListener('submit', handleSearch);
  renderFriends();
  renderFriendRequests();
  