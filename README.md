# PlayBOX

## _CRUD desenvolvido em NodeJS com express e Google Cloud (Firebase)_

autor: Alexandre (alexandre.pisani.ant@gmail.com)

##### NPM 

-   npm i
-   npm run start

## Firebase console

[Google firebase console](https://console.firebase.google.com/u/0/project/zeroqueue-30894/firestore)

![Screenshot](https://i.ibb.co/QCdbq7X/image.png)

## API Contract (Front-End team)

[Download Imsomnia](https://insomnia.rest/download)

Passo a passo para testar as apis rest do back-end Game Of Thrones

-   Baixe os arquivos json e os importe no imsomnia
    [Download imsomnia json file](https://drive.google.com/file/d/1qvtbVErwfw-QY_1WuT2l2wZbLU6xyydb/view?usp=sharing)

-   Drag and drop do arquivo baixado .json para a UI do imsomnia. A importação será realizada automaticamente.
-   Rode a primeira api "token" que retornará um access Token para ser usado nas outras apis do Crud. No Header foi definido uma autenticação que ficaria nas settings do github. estão hard-coded apenas para demonstração.
    ![Screenshot](https://i.ibb.co/FVgYmBx/image.png)

-   Agora insira o token gerado na próxima api no header de Authentication
    ![Screenshot](https://i.ibb.co/C92Fpy7/image.png)
    ![Screenshot](https://i.ibb.co/7Q3fKkn/image.png)

-   Envie o post e confira no console do firebase e também na api de listar

-   Implementação com jest e supertest
    ![Screenshot](https://i.ibb.co/sbm5Hsg/image.png)
