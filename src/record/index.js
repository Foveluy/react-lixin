import rluy from 'rluy'

rluy.init()
rluy.model(require('./model/record'))

rluy.router(require('./app/App'))
rluy.run(document.getElementById('root'))
