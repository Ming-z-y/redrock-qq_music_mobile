const Base_url = 'http://124.221.249.219:8000/api';
const guanCon = document.querySelector('#guanCon')
const daCon = document.querySelector('#daCon')
const zhuanCon = document.querySelector('#zhuanCon')
const searchBtn = document.querySelectorAll('.search')[0]
const searchBox = document.querySelectorAll('.searchBox')[0]
const searchFont = document.querySelector('#searchfont')
const cancel = document.querySelector('#cancel')
const ipt = document.querySelector('input')
const searchResult = document.querySelectorAll('.searchResult')[0]
const historyBox = document.querySelectorAll('.historyBox')[0]
const rankLi = document.querySelectorAll('.rankLi')[0]
const contentOne = document.querySelectorAll('.contentOne')[0]
const recoLi = document.querySelectorAll('.recoLi')[0]
const contentTwo = document.querySelectorAll('.contentTwo')[0]
const iconSousuo = document.querySelectorAll('.icon-sousuo')[0]

let isTrue = true
rankLi.addEventListener('click', () => {
    isTrue = true
    rankLi.className = 'rankLi active'
    recoLi.className = 'recoLi'
    searchFont.style.display = 'block'
    cancel.style.display = 'none'
    iconSousuo.style.left = '45vw'
    searchBtn.style.width = '90%'
    contentOne.style.display = 'none'
    contentTwo.style.display = 'block'
    searchBox.style.display = 'none'
})
recoLi.addEventListener('click', () => {
    rankLi.className = 'rankLi'
    recoLi.className = 'recoLi active'
    contentOne.style.display = 'block'
    contentTwo.style.display = 'none'
})

ipt.onkeydown = f
let hisArr = []

function f(e) {
    var e = e || window.event;
    var s = e.type + " " + e.keyCode;
    if (e.keyCode == 13) {
        search(`/search?keyword=${ipt.value}`)
        isDrag = true
        hisArr.forEach(e => {
            if (ipt.value == e) {
                isDrag = false
            }
        })
        if (isDrag) {
            hisArr.push(ipt.value)
            hisArr.arrReverse()
        }
    }
}


const getData = async (url) => {
    const res = await fetch(`${Base_url}${url}`)
    const json = await res.json()
    console.log(json);
    const official = json.offical
    official.forEach(e => {
        let imgBox = document.createElement('div')
        imgBox.className = 'imgBox'
        let img = document.createElement('img')
        let title = document.createElement('i')
        img.src = e.cover
        let div = document.createElement('div')
        let icon = document.createElement('i')
        icon.className = 'iconfont icon-bofang'
        icon.style.color = '#fff'
        let view = document.createElement('i')
        view.textContent = e.views + '万'
        div.className = 'viewBox'
        div.appendChild(icon)
        div.appendChild(view)
        imgBox.appendChild(div)
        imgBox.appendChild(img)
        imgBox.appendChild(title)
        title.innerText = `${e.title}`
        img.className = 'fetchImg'
        guanCon.appendChild(imgBox)
    });
    const tatsujin = json.tatsujin
    tatsujin.forEach(e => {
        let imgBox = document.createElement('div')
        imgBox.className = 'imgBox'
        let img = document.createElement('img')
        let title = document.createElement('i')
        img.src = e.cover
        let div = document.createElement('div')
        let icon = document.createElement('i')
        icon.style.color = '#fff'
        icon.className = 'iconfont icon-bofang'
        let view = document.createElement('i')
        view.textContent = e.views + '万'
        div.className = 'viewBox'
        div.appendChild(icon)
        div.appendChild(view)
        imgBox.appendChild(div)
        imgBox.appendChild(img)
        imgBox.appendChild(title)
        title.innerText = `${e.title}`
        img.className = 'fetchImg'
        daCon.appendChild(imgBox)
    });
    const column = json.column
    column.forEach(e => {
        let imgBox = document.createElement('div')
        imgBox.className = 'imgBox'
        let img = document.createElement('img')
        let content = document.createElement('i')
        let icon = document.createElement('img')
        let title = document.createElement('i')
        title.innerText = e.title
        icon.src = e.icon
        title.className = 'titleCo'
        icon.className = 'iconColumn'
        icon.style.width = '7vw'
        img.src = e.background
        imgBox.appendChild(title)
        imgBox.appendChild(img)
        imgBox.appendChild(content)
        imgBox.appendChild(icon)
        content.innerText = `${e.description}`
        img.className = 'fetchImgT'
        zhuanCon.appendChild(imgBox)
    });
}
getData('/recommendations')

searchBtn.addEventListener('click', (even) => {
    if (isTrue) {
        searchFont.style.display = 'none'
        cancel.style.display = 'inline'
        searchBtn.style.width = '85%'
        searchBox.style.display = 'block'
        iconSousuo.style.left = '5vw'
        if (hisArr.length != 0) {
            historyBox.innerHTML = `<h3>搜索历史</h3>`
            hisArr.forEach(e => {
                let p = document.createElement('p')
                p.textContent = e
                p.style.textAlign = 'left'
                p.style.marginTop = '10px'
                historyBox.appendChild(p)
            })
            historyBox.style.display = 'block'
        }
        isTrue = false
    }
})
cancel.addEventListener('click', (even) => {
    even.stopPropagation()
    searchFont.style.display = 'block'
    cancel.style.display = 'none'
    searchBtn.style.width = '90%'
    searchBox.style.display = 'none'
    iconSousuo.style.left = '45vw'
    ipt.value = ''
    searchResult.style.display = 'none'
    isTrue = true
})


const showSearch = async (url) => {
    const res = await fetch(`${Base_url}${url}`)
    const json = await res.json()
    json.forEach(e => {
        let p = document.createElement('p')
        p.className = 'paiP'
        p.style.textAlign = 'left'
        p.style.marginTop = '5px'
        p.textContent = e
        searchBox.appendChild(p)
    })
}
showSearch('/hot')

const search = async (url) => {
    const res = await fetch(`${Base_url}${url}`)
    const json = await res.json()
    searchResult.style.display = 'block'
    searchResult.innerHTML = ''
    json.forEach(e => {
        let h3 = document.createElement('h3')
        h3.textContent = e.title
        h3.style.marginTop = '10px'
        let p = document.createElement('p')
        p.textContent = e.artist
        p.style.textAlign = 'left'
        p.style.marginTop = '10px'
        let div = document.createElement('div')
        div.appendChild(h3)
        div.appendChild(p)
        searchResult.appendChild(div)
    })
}

const rank = async (url) => {
    const res = await fetch(`${Base_url}${url}`)
    const json = await res.json()
    console.log(json);
    json.forEach(e => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        img.src = e.cover
        let divLeft = document.createElement('div')
        let h3 = document.createElement('h3')
        h3.textContent = e.title
        let ol = document.createElement('ol')
        let i = 1
        e.top3.forEach(item => {
            let li = document.createElement('li')
            li.style.marginTop = '1vw'
            li.textContent = i + '. ' + item.title + '-' + item.artist
            ol.appendChild(li)
            i++;
        })
        divLeft.appendChild(h3)
        divLeft.appendChild(ol)
        div.className = 'rankItem'
        div.appendChild(divLeft)
        div.appendChild(img)
        contentTwo.appendChild(div)
    })
}
rank('/ranking')

Array.prototype.arrReverse = function () {
    for (let i = 0; i < this.length / 2; i++) {
        let changeItem = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = changeItem;
    }
}


dragula([guanCon, daCon, zhuanCon])





