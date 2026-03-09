let allIssues = [];

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("#filter .tabs button");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
      });

      button.classList.remove("btn-outline");
      button.classList.add("btn-primary");

      const filterText = button.textContent.toLowerCase();

      if (filterText === "all") {
        displayIssues(allIssues);
      } else {
        const filtered = [];
        for (let i = 0; i < allIssues.length; i++) {
          if (allIssues[i].status === filterText) {
            filtered.push(allIssues[i]);
          }
        }
        displayIssues(filtered);
      }
    });
  });

const searchInput = document.querySelector("#navbar input");
const searchButton = document.querySelector("#navbar button");

searchButton.addEventListener("click", () => {
  const searchText = searchInput.value.toLowerCase();

  const filtered = [];
  for (let i = 0; i < allIssues.length; i++) {
    if (allIssues[i].title.toLowerCase().includes(searchText)) {
      filtered.push(allIssues[i]);
    }
  }

  displayIssues(filtered);
});
});

function displayIssues(issues) {
  document.querySelector("h2").textContent = issues.length + " Issues";
  const container = document.getElementById("container");
  container.innerHTML = "";

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];

    let borderColor = "border-green-600";
    if (issue.status === "closed") {
      borderColor = "border-red-500";
    }

    let priorityColor = "badge-outline bg-gray-200";
    if (issue.priority === "high") {
      priorityColor = "badge-error";
    } else if (issue.priority === "medium") {
      priorityColor = "badge-warning";
    }

    let labelsHTML = "";
    for (let j = 0; j < issue.labels.length; j++) {
      const label = issue.labels[j];

      let labelColor = "badge-neutral bg-gray-100";
      if (label === "bug") {
        labelColor = "badge-error bg-red-100";
      } else if (label === "help wanted") {
        labelColor = "badge-warning bg-yellow-50";
      } else if (label === "enhancement") {
        labelColor = "badge-success bg-green-100";
      } else if (label === "documentation") {
        labelColor = "badge-info bg-blue-100";
      } else if (label === "good first issue") {
        labelColor = "badge-secondary bg-purple-100";
      }

      labelsHTML += `<span class="badge badge-outline ${labelColor}">${label.toUpperCase()}</span>`;
    }

    const date = new Date(issue.createdAt).toLocaleDateString();

    const card = `
      <div class="card bg-base-200 shadow">
        <div class="card-body border-t-5 ${borderColor} rounded-xl">
          <div class="flex justify-between">
            <span class="badge ${priorityColor}">${issue.priority.toUpperCase()}</span>
          </div>
          <h3 class="font-semibold">${issue.title}</h3>
          <p class="text-sm opacity-70">${issue.description}</p>
          <div class="flex gap-2 mt-2 border-b border-gray-300 pb-5 flex-wrap">
            ${labelsHTML}
          </div>
          <p class="text-xs opacity-60 mt-2">#${issue.id} by ${issue.author}</p>
          <p class="text-xs opacity-60">${date}</p>
        </div>
      </div>
    `;
    container.innerHTML += card;
  }
}

async function loadIssues() {
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const result = await response.json();
  allIssues = result.data;
  displayIssues(allIssues);
}

loadIssues();