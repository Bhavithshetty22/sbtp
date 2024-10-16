document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // User data
    const user = {
        name: "Bhavith Kumar",
        username: "@bhavith_k",
        bio: "Aspiring physicist | JEE aspirant | Love to learn and share knowledge",
        avatar: "./bhavith.jpeg",
        coverImage: "./bhavith.jpeg",
        grade: "11th Standard",
        school: "Delhi Public School",
        friends: 156,
        studyStreak: 28,
    };

    // Achievements data
    const achievements = [
        { name: "Quick Learner", icon: "zap", description: "Completed 10 lessons in a day" },
        { name: "Physics Whiz", icon: "star", description: "Scored 100% in 3 physics quizzes" },
        { name: "Bookworm", icon: "book", description: "Read 50 chapters across subjects" },
    ];

    // Study stats data
    const studyStats = [
        { subject: "Physics", hoursSpent: 120, progress: 75 },
        { subject: "Chemistry", hoursSpent: 100, progress: 68 },
        { subject: "Mathematics", hoursSpent: 150, progress: 82 },
    ];

    // Populate user info
    document.getElementById('coverImage').src = user.coverImage;
    document.getElementById('avatarImage').src = user.avatar;
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userUsername').textContent = user.username;
    document.getElementById('userBio').textContent = user.bio;
    document.getElementById('userGrade').textContent = user.grade;
    document.getElementById('userSchool').textContent = user.school;
    document.getElementById('friendCount').textContent = user.friends;
    document.getElementById('studyStreak').textContent = user.studyStreak;

    // Populate achievements
    const achievementsList = document.getElementById('achievementsList');
    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement-item';
        achievementElement.innerHTML = `
            <div class="badge"><i data-lucide="${achievement.icon}"></i></div>
            <div>
                <p><strong>${achievement.name}</strong></p>
                <p>${achievement.description}</p>
            </div>
        `;
        achievementsList.appendChild(achievementElement);
    });

    // Populate study stats
    const studyStatsList = document.getElementById('studyStatsList');
    studyStats.forEach(stat => {
        const statElement = document.createElement('div');
        statElement.innerHTML = `
            <div class="flex justify-between">
                <span><strong>${stat.subject}</strong></span>
                <span>${stat.hoursSpent} hours</span>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${stat.progress}%"></div>
            </div>
        `;
        studyStatsList.appendChild(statElement);
    });

    // Populate friends list
    const friendsList = document.getElementById('friendsList');
    for (let i = 0; i < 4; i++) {
        const friendElement = document.createElement('div');
        friendElement.className = 'friend-item';
        friendElement.innerHTML = `
            <img src="./lofi2.jpeg" alt="Friend ${i + 1}">
            <div>
                <p><strong>Friend ${i + 1}</strong></p>
                <p>11th Standard</p>
            </div>
        `;
        friendsList.appendChild(friendElement);
    }

    // Populate recent activity
    const recentActivityList = document.getElementById('recentActivityList');
    for (let i = 0; i < 3; i++) {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.innerHTML = `
            <div class="badge"><i data-lucide="trophy"></i></div>
            <div>
                <p><strong>Completed Chapter ${i + 1}</strong></p>
                <p>2 hours ago</p>
            </div>
        `;
        recentActivityList.appendChild(activityElement);
    }

    // Tab functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabName = trigger.getAttribute('data-tab');
            
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            trigger.classList.add('active');
            document.getElementById(`${tabName}Tab`).classList.add('active');
        });
    });

    // Button click handlers
    document.getElementById('editProfileBtn').addEventListener('click', () => {
        alert('Edit Profile functionality would be implemented here');
    });

    document.getElementById('addFriendsBtn').addEventListener('click', () => {
        alert('Add New Friends functionality would be implemented here');
    });
});