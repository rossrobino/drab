import "drab/define";

customElements.define(
	"on-this-page",
	class extends HTMLElement {
		connectedCallback() {
			const h2 = document.createElement("h2");
			h2.classList.add("mt-0", "text-lg", "mb-2");
			const top = document.createElement("a");
			top.href = "#";
			top.textContent = "On this page";
			h2.append(top);

			const ul = document.createElement("ul");
			ul.classList.add("pl-0");

			const article = document.querySelector("article");
			const headings = article?.querySelectorAll("h2, h3");

			if (headings?.length) {
				headings.forEach((heading) => {
					if (heading.id) {
						const li = document.createElement("li");
						li.classList.add("pl-0");
						const a = document.createElement("a");
						a.href = `#${heading.id}`;
						a.textContent = heading.textContent;
						li.append(a);
						if (heading.tagName === "H3") {
							const nestedLi = document.createElement("li");
							nestedLi.classList.add("list-none");
							const nestedUl = document.createElement("ul");
							nestedUl.classList.add("my-0");
							nestedUl.append(li);
							nestedLi.append(nestedUl);
							ul.append(nestedLi);
						} else {
							li.classList.add("list-none");
							ul.append(li);
						}
					}
				});

				this.append(h2);
				this.append(ul);
			}
		}
	},
);
