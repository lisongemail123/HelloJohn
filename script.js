async function loadRepositories() {
  const list = document.getElementById("repo-list");

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const repos = await response.json();

    list.innerHTML = "";

    repos.forEach((repo) => {
      const item = document.createElement("li");
      item.className = "repo";

      const header = document.createElement("div");
      header.className = "repo-header";

      const link = document.createElement("a");
      link.className = "repo-name";
      link.href = repo.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = `${repo.owner}/${repo.name}`;

      header.appendChild(link);

      const description = document.createElement("p");
      description.className = "repo-description";
      description.textContent = repo.description || "No description provided.";

      const meta = document.createElement("div");
      meta.className = "repo-meta";

      const language = document.createElement("span");
      language.className = "repo-language";
      const dot = document.createElement("span");
      dot.className = "language-dot";
      language.appendChild(dot);
      language.appendChild(document.createTextNode(repo.language || "Unknown"));
      meta.appendChild(language);

      const stars = document.createElement("span");
      stars.textContent = `★ ${repo.stars.toLocaleString()}`;
      meta.appendChild(stars);

      item.appendChild(header);
      item.appendChild(description);
      item.appendChild(meta);
      list.appendChild(item);
    });
  } catch (error) {
    list.innerHTML = "";
    const message = document.createElement("li");
    message.className = "repo";
    message.textContent = `Could not load repositories: ${error.message}`;
    list.appendChild(message);
  }
}

loadRepositories();
