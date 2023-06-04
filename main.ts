namespace SpriteKind {
    export const block = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setVelocity(sprite.vx, -1 * sprite.vy)
})
function getPos (sprite: Sprite, otherSprite: Sprite) {
    if (sprite.x < otherSprite.x - 8 || sprite.x > otherSprite.x + 8) {
        direction = 1
    } else {
        direction = 0
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.block, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    getPos(sprite, otherSprite)
    if (direction == 1) {
        sprite.setVelocity(-1 * sprite.vx, sprite.vy)
    } else {
        sprite.setVelocity(sprite.vx, -1 * sprite.vy)
    }
    music.zapped.play()
    otherSprite.destroy()
})
let direction = 0
let tile: Sprite = null
let tilePick = 0
let x = 0
let paddle = sprites.create(img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ..2222222222222222222222222222..
    ..2222222222222222222222222222..
    ..2222222222222222222222222222..
    ..2222222222222222222222222222..
    ................................
    `, SpriteKind.Player)
paddle.setPosition(79, 100)
paddle.setStayInScreen(true)
controller.moveSprite(paddle, 100, 0)
let projectile = sprites.createProjectileFromSprite(img`
    . . . . . b b b b b b . . . . . 
    . . . b b 9 9 9 9 9 9 b b . . . 
    . . b b 9 9 9 9 9 9 9 9 b b . . 
    . b b 9 d 9 9 9 9 9 9 9 9 b b . 
    . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
    b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
    b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
    b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
    b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
    b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
    . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
    . b d 5 3 3 3 3 3 3 3 d 5 b b . 
    . . b d 5 d 3 3 3 3 5 5 b b . . 
    . . . b b 5 5 5 5 5 5 b b . . . 
    . . . . . b b b b b b . . . . . 
    `, paddle, 50, -55)
projectile.setFlag(SpriteFlag.DestroyOnWall, false)
projectile.setBounceOnWall(true)
for (let index = 0; index <= 9; index++) {
    for (let index2 = 0; index2 <= 2; index2++) {
        x = index * 18
        if (index2 % 2 == 1) {
            x = index * (18 + 8)
        }
        tilePick = randint(0, 2)
        if (tilePick == 0) {
            tile = sprites.create(img`
                . . . . . . . . . . . 6 6 6 6 6 
                . . . . . . . . . 6 6 7 7 7 7 8 
                . . . . . . 8 8 8 7 7 8 8 6 8 8 
                . . e e e e c 6 6 8 8 . 8 7 8 . 
                . e 2 5 4 2 e c 8 . . . 6 7 8 . 
                e 2 4 2 2 2 2 2 c . . . 6 7 8 . 
                e 2 2 2 2 2 2 2 c . . . 8 6 8 . 
                e 2 e e 2 2 2 2 e e e e c 6 8 . 
                c 2 e e 2 2 2 2 e 2 5 4 2 c 8 . 
                . c 2 e e e 2 e 2 4 2 2 2 2 c . 
                . . c 2 2 2 e e 2 2 2 2 2 2 2 e 
                . . . e c c e c 2 2 2 2 2 2 2 e 
                . . . . . . . c 2 e e 2 2 e 2 c 
                . . . . . . . c e e e e e e 2 c 
                . . . . . . . . c e 2 2 2 2 c . 
                . . . . . . . . . c c c c c . . 
                `, SpriteKind.block)
        } else if (tilePick == 1) {
            tile = sprites.create(img`
                . . . . . . . 6 . . . . . . . . 
                . . . . . . 8 6 6 . . . 6 8 . . 
                . . . e e e 8 8 6 6 . 6 7 8 . . 
                . . e 2 2 2 2 e 8 6 6 7 6 . . . 
                . e 2 2 4 4 2 7 7 7 7 7 8 6 . . 
                . e 2 4 4 2 6 7 7 7 6 7 6 8 8 . 
                e 2 4 5 2 2 6 7 7 6 2 7 7 6 . . 
                e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 . 
                e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 . 
                e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 . 
                e 2 4 2 2 2 2 2 2 2 2 2 e c 6 . 
                e 2 2 2 2 2 2 2 4 e 2 e e c . . 
                e e 2 e 2 2 4 2 2 e e e c . . . 
                e e e e 2 e 2 2 e e e c . . . . 
                e e e 2 e e c e c c c . . . . . 
                . c c c c c c c . . . . . . . . 
                `, SpriteKind.block)
        } else {
            tile = sprites.create(img`
                . . . . . . . e c 7 . . . . . . 
                . . . . e e e c 7 7 e e . . . . 
                . . c e e e e c 7 e 2 2 e e . . 
                . c e e e e e c 6 e e 2 2 2 e . 
                . c e e e 2 e c c 2 4 5 4 2 e . 
                c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
                c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
                c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
                c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
                c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
                c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
                . e e e 2 2 2 2 2 2 2 2 2 4 e . 
                . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
                . . 2 e e 2 2 2 2 2 4 4 2 e . . 
                . . . 2 2 e e 4 4 4 2 e e . . . 
                . . . . . 2 2 e e e e . . . . . 
                `, SpriteKind.block)
        }
        tile.setPosition(x, index2 * 18 + 20)
    }
}
info.setScore(1)
scene.setBackgroundColor(13)
direction = 1
forever(function () {
    if (projectile.bottom > 119) {
        game.over(false, effects.slash)
    }
    if (info.score() == 30) {
        game.over(true, effects.confetti)
    }
})
