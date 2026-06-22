window.addEventListener(

    "DOMContentLoaded",

    async()=>{

        loadToday();

        loadRecent();

    }

);

async function loadToday(){

    showLoading(

        "today",

        "今日の実りを収穫しています..."

    );

    const data=

    await api.getToday();

    if(!data){

        showError("today");

        return;

    }

    document.getElementById(

        "today"

    ).innerHTML=

    createToday(data);

}

async function loadRecent(){

    showLoading(

        "recent",

        "果樹園を歩いています..."

    );

    const data=

    await api.getRecent();

    if(!data){

        showError("recent");

        return;

    }

    document.getElementById(

        "recent"

    ).innerHTML=

    data.map(

        createRecentItem

    ).join("");

}