document.addEventListener(
    "DOMContentLoaded",
    loadBlogs
);

async function loadBlogs() {

    const container =
    document.getElementById(
        "blogList"
    );

    try {

        const blogs =
        await api.getBlogs();

        if (
            !blogs ||
            blogs.length === 0
        ) {

            container.innerHTML = `
                <div class="empty">
                    まだ記事がありません。
                </div>
            `;

            return;

        }

        container.innerHTML =
        blogs.map(
            createBlogCard
        ).join("");

    }

    catch(error) {

        console.error(error);

        container.innerHTML = `
            <div class="error">
                記事を読み込めませんでした。
            </div>
        `;

    }

}

function createBlogCard(item){

    return `

    <a
        class="blogItem"
        href="${item.link}"
    >

        <div class="blogIcon">

            ${item.icon}

        </div>

        <div class="blogContent">

            <h3>

                ${item.title}

            </h3>

            <p>

                ${item.description}

            </p>

            <small>

                ${item.date}

            </small>

        </div>

    </a>

    `;

}

function formatDate(dateString) {

    const date =
    new Date(dateString);

    return date.toLocaleDateString(
        "ja-JP",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}
