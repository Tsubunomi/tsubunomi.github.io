/*
========================================

粒の実 API Library

========================================
*/

class TsubunomiAPI{

    constructor(){

        this.baseURL=CONFIG.API_URL;

    }

    async request(action,params={}){

        const url=new URL(this.baseURL);

        url.searchParams.set("action",action);

        Object.keys(params).forEach(key=>{

            url.searchParams.set(key,params[key]);

        });

        try{

            const controller=new AbortController();

            const timeout=setTimeout(()=>{

                controller.abort();

            },CONFIG.TIMEOUT);

            const response=await fetch(

                url,

                {

                    signal:controller.signal

                }

            );

            clearTimeout(timeout);

            if(!response.ok){

                throw new Error(

                    "Network Error"

                );

            }

            return await response.json();

        }

        catch(error){

            console.error(error);

            return null;

        }

    }

    async getToday(){

        return await this.request("today");

    }

    async getRecent(limit=CONFIG.RECENT_LIMIT){

        return await this.request(

            "recent",

            {

                limit

            }

        );

    }

    async getWorks(category=""){

        return await this.request(

            "works",

            {

                category

            }

        );

    }

    async getNovels(){

        return await this.request(

            "novels"

        );

    }

    async getMusic(){

        return await this.request(

            "music"

        );

    }

    async getPrograms(){

        return await this.request(

            "programs"

        );

    }

    async getExplore(){

        return await this.request(

            "explore"

        );

    }

}

const api=new TsubunomiAPI();

/*
========================================

描画関数

========================================
*/

function createRecentItem(item){

    return `

    <div class="item fadeIn">

        <div class="itemIcon">

            ${item.icon}

        </div>

        <div>

            <div class="itemTitle">

                ${item.title}

            </div>

            <div class="itemDate">

                ${item.date}

            </div>

        </div>

    </div>

    `;

}

function createToday(data){

    return `

    <div class="fadeIn">

        <strong>

            ${data.icon}

            ${data.title}

        </strong>

        <br>

        ${data.description}

    </div>

    `;

}

function showLoading(id,text="読み込み中..."){

    document.getElementById(id).innerHTML=

    `

    <div class="loading">

    ${text}

    </div>

    `;

}

function showError(id){

    document.getElementById(id).innerHTML=

    `

    <div class="loading">

    🍃 まだ実がなっていません。

    </div>

    `;

}