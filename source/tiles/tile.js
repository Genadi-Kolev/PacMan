class Tile {

    object;
    activeSprite; inactiveSprite;

    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;

        this.tileDim = 8;

        this.#create();
    }

    #create() {
        this.object = document.createElement('div');
        this.activeSprite = this.#createTileSprite(this.x, this.y, 0);
        this.inactiveSprite = this.#createTileSprite(this.x, this.y, 228);

        this.object.appendChild(this.activeSprite);
        this.object.appendChild(this.inactiveSprite);
        this.inactiveSprite.style.display = 'none';

        this.object.className = this.type;
        this.object.style.width = this.object.style.height = this.tileDim + 'px';
        this.object.style.left = this.x * this.tileDim + 'px';
        this.object.style.top = this.y * this.tileDim + 'px';

        return this;
    }

    #createTileSprite(x, y, increment) {
        const sprite = document.createElement('img');

        const up = 0 + (8 * y);
        const left = 672 - (8 * x) - increment;
        const down = 240 - (8 * y);
        const right = 0 + (8 * x) + increment;

        sprite.src = '../Nursery/spritesheet.png';
        sprite.className = 'tile';
        sprite.style.clipPath = 'inset(' + up + 'px ' + left + 'px ' + down + 'px ' + right + 'px)';
        sprite.style.left = -x * this.tileDim - increment + 'px';
        sprite.style.top = -y * this.tileDim + 'px';

        return sprite;
    }

    toggleTile() {
        switch (this.activeSprite.style.display) {
            case 'none':
                this.inactiveSprite.style.display = 'none';
                this.activeSprite.style.display = '';
                break;

            case '':
                this.inactiveSprite.style.display = 'initial';
                this.activeSprite.style.display = 'none';
                break;
        }
    }
};


export { Tile };