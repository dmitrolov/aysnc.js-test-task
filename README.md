# aysnc.js-test-task

нужно реализовать следующую задачу:
- приходит массив запросов, параметр отправлять ли их параллельно (по дефолту тру) и параметр показывать ли результат если что-то зафейлится (по дефолту тру)
- нужно обработать выполнение этого массива и хендлинг ошибок
- к этому всему давай сделаем простую вьюшку которая 
    - будет отображать этот список 
    - ставить возле каждого 
        - галочка (если саксес) 
        - крестик если ошибка
        - значек стоп если этот запрос так и не ушел
    - итоговый стейт (с учетом 2го и 3го параметра)