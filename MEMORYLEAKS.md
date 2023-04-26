Проведено тестирование на утечки памяти. Ниже представлен краткий отчет по протестированным кейсам.
1. Кейс 1: Проверка на освобождение памяти от создаваемых в игре объектов.
При столкновении игровых объектов или их ухода за границы экрана - они очищаются, для наглядности представлен график, запись по которому сделана в процессе игры, а именно перестрелки. Количество нод увеличивается в связи с созданием новых сеток врагов, однако, - в самом конце, когда мы большинство перестреляли - видим спад
![image](https://user-images.githubusercontent.com/72806681/234377342-114eda70-f0b9-4cc9-acf4-49dd95fdbdee.png)
2. Кейс 2: Проверка на освобождение памяти от слушателей событий при остановке игры.
При остановке игры слушатели очищаются, память не забивается
![image](https://user-images.githubusercontent.com/72806681/234377085-90b50214-e34c-434b-b94e-b7876360f647.png)
3. Кейс 3: Проверка на очищение памяти при перезапуске игры.
При входе-выходе туда сюда из игры (несколько раз стартуем ее и уходим) - память очищается как от нод, так и от слушателей. На скриншоте - сначала играем, потом выходим - снова заходим и начинаем игру и опять выходим
![image](https://user-images.githubusercontent.com/72806681/234377302-df252cc4-9682-4715-aee1-724a1a134a33.png)
4. Кейс 4: Долгая игра
При долгой игре создаются сетки игровых объектов, при уничтожении/выход за границы - они очищаются. На графике представлено создание трех сеток игровых объектов и их устранение
![image](https://user-images.githubusercontent.com/72806681/234377198-4deea1ff-897f-44cb-9dfd-871eb6481e36.png)
5. Кейс 5: Режим нормальной работы
При инициализации приложения памяти уходит немного больше, далее при переходах - все работает стабильно
![image](https://user-images.githubusercontent.com/72806681/234377387-0eb6e7a4-3073-460a-b9da-91fece2e4b4c.png)