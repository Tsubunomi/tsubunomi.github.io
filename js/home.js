loadRecent();

async function loadRecent(){

    showLoading(
        "recent",
        "果樹園を歩いています..."
    );

    const data =
    await api.getRecent();

    if(!data){
        showError("recent");
        return;
    }

    document.getElementById(
        "recent"
    ).innerHTML =
    data.map(
        createRecentItem
    ).join("");

}
