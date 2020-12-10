class GS_Carousel{
    constructor(element,options={}){
        this.element=element
        this.options=Object.assign({},
            {
                slideToScroll:1,
                slideToShow:1,
                pagination:false,
                infinite: false,
                center:false,
                dragMode:false,
                autoCarousel:false,
             },options);
        this.offset=0;
        this.currentSlide=0;
        this.slides=[].slice.call(this.element.children)
        
        this.btns=[]
        this.root=this.createDiv("carousel");
        this.container=this.createDiv("carousel__container");
        this.root.appendChild(this.container);
        
        this.id=0;
        this.items=this.slides.map((slide)=>{
              let item=this.createDiv("carousel__item")
              item.appendChild(slide)
              return item;
        });
        
        this.createNavigation();
        if(this.options.pagination){
            this.createPagination();
        }
        if(this.options.infinite){
            this.infiniteMove();
        }
        this.ratio=this.items.length/this.options.slideToShow;
        this.items.forEach((item)=>{
            item.style.width= ((100/ this.options.slideToShow)/this.ratio)+"%"
            item.setAttribute("id","item__"+this.id);
            this.id++;
            this.container.appendChild(item)
        })
       if(this.options.infinite){
        this.container.addEventListener('transitionend',this.resetInfinite.bind(this))
       }
       this.setStyle()
      if(this.options.center){
            this.middleIndex=Math.floor((this.items.length-1)/2)
            this.itemIncenter=document.querySelector("#item__"+this.middleIndex);
            this.itemRigth=document.querySelector("#item__"+(this.middleIndex+1));
            this.itemLeft=document.querySelector("#item__"+(this.middleIndex-1))
            this.centerMode();
            
       }
       if(this.options.center){
        this.container.addEventListener('transitionend',this.resetCenter.bind(this))
       }
       if(this.options.dragMode){
        this.dragMode();
       }
       if(this.options.autoCarousel){
           this.autoCarousel()
       }
    }
    
    createDiv(className){
          let div =document.createElement('div')
          div.setAttribute('class', className)
          return div;
    }
    
    createNavigation(){
        let nextBtn=this.createDiv("carousel__next");
        let prevBtn=this.createDiv("carousel__prev");
        let root2=document.querySelector("#gs_carousel")
        root2.appendChild(nextBtn)
        root2.appendChild(prevBtn)
        nextBtn.addEventListener("click", this.next.bind(this))
        prevBtn.addEventListener("click", this.prev.bind(this))
    }
    
    onMove(){
        
        let btnActive=Math.floor(this.currentSlide/this.options.slideToScroll)
        this.btns.forEach((item)=>{ item.classList.remove("active__pagination")})
        this.btns[btnActive].classList.add("active__pagination")
    }
    
    
    next(){ 
        this.gotoItem(this.currentSlide+this.options.slideToScroll)
    }
    
    prev(){
        this.gotoItem(this.currentSlide-this.options.slideToScroll)
    }
    
    gotoItem(index,animation){
        
        if(index<0){
          if(!this.options.infinite){
              index=this.items.length-this.options.slideToShow
          }
        }
        if(index>(this.items.length-this.options.slideToShow)){
            if(!this.options.infinite){
                index=0;
            }
        }
        let translateX=(index * (-100/this.items.length));
        if(animation=== false){
            
            this.container.style.transition='none';
        }
        this.container.style.transform="translate3d("+translateX+"%,0,0)";
        this.container.offsetHeight //force repaint
        if(animation=== false){
            this.container.style.transition='';
        }
        this.currentSlide=index; 
         if(this.options.pagination==true){
            this.onMove()
        }
         
   
    }

    resetInfinite(){
        if(this.currentSlide <0){
            if(this.currentSlide<0){
                this.currentSlide=0
            }
            let index=this.currentSlide+(this.items.length - this.options.slideToScroll* this.offset);
            this.gotoItem(index, false)
        }else if(this.currentSlide >= this.items.length-this.offset){
            this.currentSlide=this.items.length-this.offset
            this.gotoItem((this.currentSlide-(this.items.length-this.options.slideToScroll* this.offset)), false)
        }
    }


    createPagination(){
        let pagination=this.createDiv("carousel__pagination")
        this.root.appendChild(pagination)
        for(let i=0; i < this.children.length;i+=this.options.slideToScroll){
         
            let btn=this.createDiv("carousel__pagination__btn")
            btn.addEventListener('click',()=>{
                     this.gotoItem(i);
                    
            });
            pagination.appendChild(btn);
            this.btns[i]=btn;
        }  
    }
    infiniteMove(){
        this.offset= this.options.slideToShow*2-1;
        let itemsLength=this.items.length;
        this.items=[
            ...this.items.slice(itemsLength-this.offset).map(item=>item.cloneNode(true)),
            ...this.items,
            ...this.items.slice(0,itemsLength-this.offset).map(item=>item.cloneNode(true)),
        ]  
        this.gotoItem(this.offset,false)
    }
    
    centerMode(){
   
    this.itemIncenter.classList.add("zoom")
    this.itemLeft.classList.add("transparent")
    this.itemRigth.classList.add("transparent")
    this.gotoItem(this.middleIndex-1,false)
 
    }

    resetCenter(){
       
       this.itemIncenter.classList.remove("zoom")
       this.itemLeft.classList.remove("transparent")
       this.itemRigth.classList.remove("transparent")
       this.middleIndex=this.currentSlide+1;
       this.itemIncenter=document.querySelector("#item__"+this.middleIndex);
       this.itemRigth=document.querySelector("#item__"+(this.middleIndex+1));
       this.itemLeft=document.querySelector("#item__"+(this.middleIndex-1))
       this.itemIncenter.classList.add("zoom")
       this.itemLeft.classList.add("transparent")
       this.itemRigth.classList.add("transparent")

    }

    dragMode(){
        
        this.container.addEventListener("dragstart",(e)=>{ e.preventDefault()})
        this.container.addEventListener("mousedown",this.dragStart.bind(this))
        document.addEventListener("mousemove",this.drag.bind(this))
        document.addEventListener("mouseup",this.dragEnd.bind(this)) 
       
    }
    
    dragStart(e){
       
        this.origins={
            x:e.clientX,
            y:e.clientY
        }
       this.startDrag=true
       
       
    }

    drag(e){
       if(this.startDrag){
           let pointMotion={
                 x:e.clientX,
                 y:e.clientY,
            }
            this.deltaDist={
                 deltaX:pointMotion.x-this.origins.x,
                 deltaY:pointMotion.y-this.origins.y
            }
            this.containerWidth=this.container.offsetWidth
            let baseTranslate= this.currentSlide* -100 / this.items.length
            this.container.style.transform="translate3d("+(baseTranslate+100 *this.deltaDist.deltaX/this.containerWidth)+"%,0,0)"
            console.log(this.deltaDist)
       }
       
    }

    dragEnd(e){
        if(this.startDrag){
            console.log(Math.abs(this.deltaDist.deltaX/this.containerWidth))
            if(Math.abs(this.deltaDist.deltaX/this.containerWidth)>0.0){
                if(this.deltaDist.deltaX<0){
                    this.next();
                }else{
                    this.prev();
                }
            }
            this.startDrag=false;
        }
    }
    autoCarousel(){
        setInterval(()=>{
            for(let i=0;i<this.items.length;i++){
                    setTimeout(this.next.bind(this),4000*(i+1))
                    break;
            }
        },5000)
               
    }
    
    setStyle(){
        this.container.style.width=(this.ratio*100)+"%";
        this.element.appendChild(this.root);
    }
}



