window.addEventListener('DOMContentLoaded', () => {
    var prevActiveID = null;
    let options = {
        rootMargin: '0px',
        threshold: 1.0
    }
const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const el = document.querySelector(`nav li a[href="#${id}"]`);

        if (el && entry.isIntersecting && entry.intersectionRatio === 1) {
            document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('is-visible');
            prevActiveID = id;
        } else {
            document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('is-visible');
        }
        
        
        });
        let firstVisibleLink = document.querySelector('.is-visible')

        document.querySelectorAll('nav li').forEach(link => {
            link.classList.remove('selected')
        })

        if (firstVisibleLink) {
            firstVisibleLink.classList.add('selected')
        }

        if (!firstVisibleLink && prevActiveID) {
            document.querySelector(`nav li a[href="#${prevActiveID}"]`).parentElement.classList.add('selected')
        }
},options);

// Track all sections that have an `id` applied
document.querySelectorAll('h1[id]').forEach((section) => {
    observer.observe(section);
});
var tags_filter = [];
var years_filter = [];

//Update to a generic filtering class? thats extendable maybe
function filterElement(el){
    let year = el.attributes["data-year"].value;
    let art_tags = el.attributes["data-tags"].value.split(' ');
    let tT = tags_filter.every((item)=>{ return art_tags.includes(`tag-${item}`); })
    let tY = years_filter.includes(year);
    if((tY || years_filter.length === 0) && tT){
        el.classList.remove('slideout');
        //This remedies a popin on first filter selection
        if(el.classList.contains('hidden')){
            el.classList.add('slidein');
        }
        el.classList.remove('hidden');
    }else{
        el.classList.remove('slidein');
        el.classList.add('slideout');
        el.classList.add('hidden');
    }
}
document.querySelectorAll('a.tag').forEach((tag)=>{
  tag.addEventListener('click',(el)=>{
      //hide all elements
      let tag_name = el.target.text;
      el.target.classList.toggle('selected');
      let isSelected = el.target.classList.contains('selected');
      
      tags_filter = Array.from(document.querySelectorAll('a.tag.selected')).flatMap((item)=>{
          return item.text;
      });
    
    document.querySelectorAll(`article`).forEach(item=>{
        filterElement(item)
      })
  })
})

document.querySelectorAll('a.tag-year').forEach((tag)=>{
    tag.addEventListener('click',(el)=>{
        //hide all elements
        let tag_name = el.target.text;
        el.target.classList.toggle('selected');
        years_filter = Array.from(document.querySelectorAll('a.tag-year.selected')).flatMap((item)=>{
            return item.text;
        });
       
        document.querySelectorAll(`article`).forEach(item=>{
            filterElement(item);
          })
    })
  })
});