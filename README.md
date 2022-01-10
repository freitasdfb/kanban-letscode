

# Let's Code Kanban

Este projeto foi desenvolvido para o desafio técnico da let's code para frontend

Para iniciar o projeto, basta executar o comando:

    npm run start
 Este comando irá inicializar o projeto frontend, que está hospedado na porta **3000**
Para acessá-lo via browser, acessar o endereço:

    http://localhost:3000
Esse projeto parte do princípio de que já se esteja executando o serviço backend para qual ele foi escrito, rodando na porta **5000**

O projeto consiste em um kanban básico com três colunas: "To do", "Doing" e "Done"

Comece criando um card no botão "Create New Card", que o card criado vai primeiramente para a coluna 'To do'.

Deixei o usuário, senha e  url no código mesmo com o pensamento de que todo o ambiente seria rodado localmente;

A primeira requisição é feita no didMount do primeiro componente, que foi utilizado com um react hook, para que se possa pegar o **token jwt** do backend e armazená-lo no local storage. As demais requisições usam deste token para se autenticar no backend;

No projeto foram utilizados princípios do Material Design, com base na biblioteca `'mui'` desenvolvida para react;

O projeto foi inicializado a partir do script creact-react-app;

Seus componentes foram pensados para um reuso, então boa parte deles pode ser importado em um componente para que se posso ser utilizado;

Em boa parte deles usei styled components para estilização. Nenhum componente possui um arquivo css a parte para editar;

Apenas em dois componentes foi necessário passar uma função callback via props para poder realizar um melhor workflow. Diante disso, eu até pensei que poderia ter usado redux, mas achei que seria uma grande implementação para um simples uso.


Obrigado pela oportunidade e espero ter satisfeito às expectativas!
