// 12 команд, по 3 лікаря в кожній
let teams = [
    ["Ляшкова Олена Валентинівна", "Рак Ярослав Олександрович", "Мороз Олег Орестович"],
    ["Богачук Любов Миколаївна", "Пирожок Оксана Тимофіївна", "Сюсько Андрій Сергійович"],
    ["Юринишина Людмила Михайлівна", "Денисюк Надія Сергіївна", "Незборецький Сергій Олексійович"],
    ["Дірей Олег Олександрович", "Савчук Ірина Василівна", "Колодчук Євген Михайлович"],
    ["Пономарьов Сергій Васильович", "Денисюк Надія Сергіївна", "Мартишевський Мирослав Олександрович"],
    ["Васик Наталія Василівна", "Юринишина Людмила Михайлівна", "Кукуруза Любов Григорівна"],
    ["Незборецький Сергій Олексійович", "Горох Лариса Юріївна", "Дірей Тетяна Валеріївна"],
    ["Федина Михайло Ярославович", "Горох Лариса Юріївна", "Кукуруза Любов Григорівна"],
    ["Мартишевський Мирослав Олександрович", "Денисюк Надія Сергіївна", "Пономарьов Сергій Васильович"],
    ["Савчук Ірина Василівна", "Пирожок Оксана Тимофіївна", "Васик Наталія Василівна"],
    ["Рак Ярослав Олександрович", "Пономарьов Сергій Васильович", "Незборецький Сергій Олексійович"],
    ["Дірей Тетяна Валеріанівна", "Рак Ярослав Олександрович", "Колодчук Євген Михайлович"]
];

// Функція для заповнення випадаючого списку з командами
function populateTeamList() {
    const select = document.getElementById("teamsSelect");

    teams.forEach((team, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `Команда ${index + 1}`;
        select.appendChild(option);
    });
}

// Функція для формування бригади
function createBrigade() {
    const selectedOptions = document.getElementById("teamsSelect").selectedOptions;
    const selectedTeamsIndexes = Array.from(selectedOptions).map(option => option.value);

    // Збираємо лікарів з обраних команд
    let selectedDoctors = [];
    selectedTeamsIndexes.forEach(index => {
        selectedDoctors = selectedDoctors.concat(teams[index]);
    });

    // Перевірка на повторення лікарів між командами
    let doctorSet = new Set();
    for (let i = 0; i < selectedDoctors.length; i++) {
        if (doctorSet.has(selectedDoctors[i])) {
            showError("Лікарі не повинні повторюватися між командами для одного дня!");
            return;
        }
        doctorSet.add(selectedDoctors[i]);
    }

    // Відображення команди в стовпчик
    const brigadeDiv = document.getElementById("brigade");
    brigadeDiv.innerHTML = ''; // Очищаємо попереднє відображення

    selectedTeamsIndexes.forEach(index => {
        const teamDoctors = teams[index];
        const teamDiv = document.createElement("div");
        teamDiv.classList.add("team");
        teamDiv.textContent = `Команда ${parseInt(index) + 1}: ${teamDoctors.join(", ")}`;
        brigadeDiv.appendChild(teamDiv);
    });

    // Очищуємо повідомлення про помилку
    hideError();
}

// Функція для показу помилки
function showError(message) {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = message;
}

// Функція для приховування помилки
function hideError() {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = '';
}

populateTeamList();