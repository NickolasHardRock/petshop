const auth = [{ bearerAuth: [] }];

const createIdParam = (name = 'id') => ({
  name,
  in: 'path',
  required: true,
  schema: { type: 'integer', example: 1 },
});

const ok = (description, schema, message, isArray = false) => ({
  description,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: message },
          data: isArray ? { type: 'array', items: schema } : schema,
        },
      },
    },
  },
});

const emptyOk = (description, message) => ({
  description,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: message },
          data: { type: 'null', example: null },
        },
      },
    },
  },
});

const err = (description, message) => ({
  description,
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ErrorResponse' },
      example: { success: false, message },
    },
  },
});

module.exports = (serverUrl) => ({
  openapi: '3.0.3',
  info: {
    title: 'Petshop Backend API',
    version: '1.0.0',
    description:
      'Backend de petshop com Node.js, Express, Sequelize, SQLite, Swagger, Axios e autenticacao JWT.',
  },
  servers: [{ url: serverUrl, description: 'Servidor local' }],
  tags: [
    { name: 'Health' },
    { name: 'Auth' },
    { name: 'Users' },
    { name: 'Owners' },
    { name: 'Pets' },
    { name: 'Service Types' },
    { name: 'Services' },
    { name: 'Utilities' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Erro interno do servidor.' },
          errors: { type: 'array', items: { type: 'object' }, nullable: true },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Administrador' },
          email: { type: 'string', example: 'admin@petshop.local' },
          role: { type: 'string', enum: ['admin', 'attendant'], example: 'admin' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      AuthPayload: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Maria Souza' },
          email: { type: 'string', example: 'maria@petshop.local' },
          password: { type: 'string', example: 'senha123' },
        },
      },
      UpdateUserRequest: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Maria Souza' },
          email: { type: 'string', example: 'maria@petshop.local' },
          password: { type: 'string', example: 'novaSenha123' },
          role: { type: 'string', enum: ['admin', 'attendant'], example: 'attendant' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'admin@petshop.local' },
          password: { type: 'string', example: 'admin123' },
        },
      },
      Owner: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Carlos Lima' },
          document: { type: 'string', example: '12345678900' },
          phone: { type: 'string', example: '(11) 99999-0000' },
          email: { type: 'string', example: 'carlos@email.com' },
          address: { type: 'string', example: 'Rua das Flores, 100' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      OwnerInput: {
        type: 'object',
        required: ['name', 'document', 'phone', 'email', 'address'],
        properties: {
          name: { type: 'string', example: 'Carlos Lima' },
          document: { type: 'string', example: '12345678900' },
          phone: { type: 'string', example: '(11) 99999-0000' },
          email: { type: 'string', example: 'carlos@email.com' },
          address: { type: 'string', example: 'Rua das Flores, 100' },
        },
      },
      Pet: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Thor' },
          species: { type: 'string', example: 'Cachorro' },
          breed: { type: 'string', example: 'Labrador' },
          size: { type: 'string', enum: ['small', 'medium', 'large'], example: 'large' },
          age: { type: 'integer', example: 5 },
          weight: { type: 'number', example: 28.4 },
          notes: { type: 'string', example: 'Alergia a perfume.' },
          ownerId: { type: 'integer', example: 1 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      PetInput: {
        type: 'object',
        required: ['name', 'species', 'breed', 'size', 'age', 'weight', 'ownerId'],
        properties: {
          name: { type: 'string', example: 'Thor' },
          species: { type: 'string', example: 'Cachorro' },
          breed: { type: 'string', example: 'Labrador' },
          size: { type: 'string', enum: ['small', 'medium', 'large'], example: 'large' },
          age: { type: 'integer', example: 5 },
          weight: { type: 'number', example: 28.4 },
          notes: { type: 'string', example: 'Alergia a perfume.' },
          ownerId: { type: 'integer', example: 1 },
        },
      },
      ServiceType: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Banho' },
          description: { type: 'string', example: 'Banho completo.' },
          basePrice: { type: 'number', example: 45 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      ServiceTypeInput: {
        type: 'object',
        required: ['name', 'basePrice'],
        properties: {
          name: { type: 'string', example: 'Banho' },
          description: { type: 'string', example: 'Banho completo.' },
          basePrice: { type: 'number', example: 45 },
        },
      },
      ServiceRecord: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          petId: { type: 'integer', example: 1 },
          serviceTypeId: { type: 'integer', example: 1 },
          serviceDate: { type: 'string', format: 'date-time', example: '2026-04-21T10:00:00.000Z' },
          chargedAmount: { type: 'number', example: 55 },
          notes: { type: 'string', example: 'Atendimento concluido.' },
          status: {
            type: 'string',
            enum: ['scheduled', 'in_progress', 'completed', 'canceled'],
            example: 'completed',
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      ServiceRecordInput: {
        type: 'object',
        required: ['petId', 'serviceTypeId', 'serviceDate', 'chargedAmount', 'status'],
        properties: {
          petId: { type: 'integer', example: 1 },
          serviceTypeId: { type: 'integer', example: 1 },
          serviceDate: { type: 'string', format: 'date-time', example: '2026-04-21T10:00:00.000Z' },
          chargedAmount: { type: 'number', example: 55 },
          notes: { type: 'string', example: 'Atendimento concluido.' },
          status: {
            type: 'string',
            enum: ['scheduled', 'in_progress', 'completed', 'canceled'],
            example: 'completed',
          },
        },
      },
      CepLookup: {
        type: 'object',
        properties: {
          cep: { type: 'string', example: '01001-000' },
          logradouro: { type: 'string', example: 'Praca da Se' },
          bairro: { type: 'string', example: 'Se' },
          localidade: { type: 'string', example: 'Sao Paulo' },
          uf: { type: 'string', example: 'SP' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verifica a saude da API',
        responses: { 200: { description: 'API operacional' } },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registra um novo usuario',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateUserRequest' } } },
        },
        responses: {
          201: ok('Usuario registrado', { $ref: '#/components/schemas/AuthPayload' }, 'Usuario registrado com sucesso.'),
          409: err('Conflito', 'Ja existe um usuario com este email.'),
          422: err('Validacao', 'Dados de entrada invalidos.'),
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Autentica usuario e retorna JWT',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
        },
        responses: {
          200: ok('Login realizado', { $ref: '#/components/schemas/AuthPayload' }, 'Login realizado com sucesso.'),
          401: err('Nao autorizado', 'Credenciais invalidas.'),
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Retorna o usuario autenticado',
        security: auth,
        responses: {
          200: ok('Usuario autenticado', { $ref: '#/components/schemas/User' }, 'Usuario autenticado.'),
          401: err('Nao autorizado', 'Token invalido ou expirado.'),
        },
      },
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Lista usuarios',
        security: auth,
        responses: {
          200: ok('Usuarios listados', { $ref: '#/components/schemas/User' }, 'Usuarios listados com sucesso.', true),
          403: err('Proibido', 'Usuario sem permissao para esta operacao.'),
        },
      },
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Busca usuario por ID',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: ok('Usuario encontrado', { $ref: '#/components/schemas/User' }, 'Usuario encontrado com sucesso.'),
          404: err('Nao encontrado', 'Usuario nao encontrado.'),
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Atualiza usuario',
        security: auth,
        parameters: [createIdParam()],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } } },
        },
        responses: {
          200: ok('Usuario atualizado', { $ref: '#/components/schemas/User' }, 'Usuario atualizado com sucesso.'),
          404: err('Nao encontrado', 'Usuario nao encontrado.'),
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Remove usuario',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: emptyOk('Usuario removido', 'Usuario removido com sucesso.'),
          404: err('Nao encontrado', 'Usuario nao encontrado.'),
        },
      },
    },
    '/api/owners': {
      get: {
        tags: ['Owners'],
        summary: 'Lista donos',
        security: auth,
        parameters: [
          { name: 'name', in: 'query', schema: { type: 'string' } },
          { name: 'document', in: 'query', schema: { type: 'string' } },
          { name: 'email', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: ok('Donos listados', { $ref: '#/components/schemas/Owner' }, 'Donos listados com sucesso.', true),
        },
      },
      post: {
        tags: ['Owners'],
        summary: 'Cria dono',
        security: auth,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/OwnerInput' } } },
        },
        responses: {
          201: ok('Dono criado', { $ref: '#/components/schemas/Owner' }, 'Dono criado com sucesso.'),
          422: err('Validacao', 'Dados de entrada invalidos.'),
        },
      },
    },
    '/api/owners/{id}': {
      get: {
        tags: ['Owners'],
        summary: 'Busca dono por ID',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: ok('Dono encontrado', { $ref: '#/components/schemas/Owner' }, 'Dono encontrado com sucesso.'),
          404: err('Nao encontrado', 'Dono nao encontrado.'),
        },
      },
      put: {
        tags: ['Owners'],
        summary: 'Atualiza dono',
        security: auth,
        parameters: [createIdParam()],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/OwnerInput' } } },
        },
        responses: {
          200: ok('Dono atualizado', { $ref: '#/components/schemas/Owner' }, 'Dono atualizado com sucesso.'),
          404: err('Nao encontrado', 'Dono nao encontrado.'),
        },
      },
      delete: {
        tags: ['Owners'],
        summary: 'Remove dono',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: emptyOk('Dono removido', 'Dono removido com sucesso.'),
          409: err('Conflito', 'Nao e possivel excluir dono com pets vinculados.'),
        },
      },
    },
    '/api/pets': {
      get: {
        tags: ['Pets'],
        summary: 'Lista pets',
        security: auth,
        parameters: [
          { name: 'name', in: 'query', schema: { type: 'string' } },
          { name: 'species', in: 'query', schema: { type: 'string' } },
          { name: 'ownerId', in: 'query', schema: { type: 'integer' } },
        ],
        responses: {
          200: ok('Pets listados', { $ref: '#/components/schemas/Pet' }, 'Pets listados com sucesso.', true),
        },
      },
      post: {
        tags: ['Pets'],
        summary: 'Cria pet',
        security: auth,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PetInput' } } },
        },
        responses: {
          201: ok('Pet criado', { $ref: '#/components/schemas/Pet' }, 'Pet criado com sucesso.'),
          404: err('Nao encontrado', 'Dono informado nao encontrado.'),
        },
      },
    },
    '/api/pets/{id}': {
      get: {
        tags: ['Pets'],
        summary: 'Busca pet por ID',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: ok('Pet encontrado', { $ref: '#/components/schemas/Pet' }, 'Pet encontrado com sucesso.'),
          404: err('Nao encontrado', 'Pet nao encontrado.'),
        },
      },
      put: {
        tags: ['Pets'],
        summary: 'Atualiza pet',
        security: auth,
        parameters: [createIdParam()],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PetInput' } } },
        },
        responses: {
          200: ok('Pet atualizado', { $ref: '#/components/schemas/Pet' }, 'Pet atualizado com sucesso.'),
          404: err('Nao encontrado', 'Pet nao encontrado.'),
        },
      },
      delete: {
        tags: ['Pets'],
        summary: 'Remove pet',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: emptyOk('Pet removido', 'Pet removido com sucesso.'),
          409: err('Conflito', 'Nao e possivel excluir pet com servicos vinculados.'),
        },
      },
    },
    '/api/service-types': {
      get: {
        tags: ['Service Types'],
        summary: 'Lista tipos de servico',
        security: auth,
        parameters: [{ name: 'name', in: 'query', schema: { type: 'string' } }],
        responses: {
          200: ok(
            'Tipos de servico listados',
            { $ref: '#/components/schemas/ServiceType' },
            'Tipos de servico listados com sucesso.',
            true
          ),
        },
      },
      post: {
        tags: ['Service Types'],
        summary: 'Cria tipo de servico',
        security: auth,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceTypeInput' } } },
        },
        responses: {
          201: ok(
            'Tipo de servico criado',
            { $ref: '#/components/schemas/ServiceType' },
            'Tipo de servico criado com sucesso.'
          ),
          403: err('Proibido', 'Usuario sem permissao para esta operacao.'),
        },
      },
    },
    '/api/service-types/{id}': {
      get: {
        tags: ['Service Types'],
        summary: 'Busca tipo de servico por ID',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: ok(
            'Tipo de servico encontrado',
            { $ref: '#/components/schemas/ServiceType' },
            'Tipo de servico encontrado com sucesso.'
          ),
          404: err('Nao encontrado', 'Tipo de servico nao encontrado.'),
        },
      },
      put: {
        tags: ['Service Types'],
        summary: 'Atualiza tipo de servico',
        security: auth,
        parameters: [createIdParam()],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceTypeInput' } } },
        },
        responses: {
          200: ok(
            'Tipo de servico atualizado',
            { $ref: '#/components/schemas/ServiceType' },
            'Tipo de servico atualizado com sucesso.'
          ),
          403: err('Proibido', 'Usuario sem permissao para esta operacao.'),
        },
      },
      delete: {
        tags: ['Service Types'],
        summary: 'Remove tipo de servico',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: emptyOk('Tipo de servico removido', 'Tipo de servico removido com sucesso.'),
          409: err('Conflito', 'Nao e possivel excluir tipo de servico com atendimentos vinculados.'),
        },
      },
    },
    '/api/services': {
      get: {
        tags: ['Services'],
        summary: 'Lista servicos realizados',
        security: auth,
        parameters: [
          { name: 'petId', in: 'query', schema: { type: 'integer' } },
          { name: 'serviceTypeId', in: 'query', schema: { type: 'integer' } },
          { name: 'status', in: 'query', schema: { type: 'string' } },
          { name: 'fromDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
          { name: 'toDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
        ],
        responses: {
          200: ok(
            'Servicos listados',
            { $ref: '#/components/schemas/ServiceRecord' },
            'Servicos realizados listados com sucesso.',
            true
          ),
        },
      },
      post: {
        tags: ['Services'],
        summary: 'Cria servico realizado',
        security: auth,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceRecordInput' } } },
        },
        responses: {
          201: ok(
            'Servico criado',
            { $ref: '#/components/schemas/ServiceRecord' },
            'Servico realizado criado com sucesso.'
          ),
          404: err('Nao encontrado', 'Pet informado nao encontrado.'),
        },
      },
    },
    '/api/services/{id}': {
      get: {
        tags: ['Services'],
        summary: 'Busca servico realizado por ID',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: ok(
            'Servico encontrado',
            { $ref: '#/components/schemas/ServiceRecord' },
            'Servico realizado encontrado com sucesso.'
          ),
          404: err('Nao encontrado', 'Servico realizado nao encontrado.'),
        },
      },
      put: {
        tags: ['Services'],
        summary: 'Atualiza servico realizado',
        security: auth,
        parameters: [createIdParam()],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceRecordInput' } } },
        },
        responses: {
          200: ok(
            'Servico atualizado',
            { $ref: '#/components/schemas/ServiceRecord' },
            'Servico realizado atualizado com sucesso.'
          ),
          404: err('Nao encontrado', 'Servico realizado nao encontrado.'),
        },
      },
      delete: {
        tags: ['Services'],
        summary: 'Remove servico realizado',
        security: auth,
        parameters: [createIdParam()],
        responses: {
          200: emptyOk('Servico removido', 'Servico realizado removido com sucesso.'),
          404: err('Nao encontrado', 'Servico realizado nao encontrado.'),
        },
      },
    },
    '/api/utils/cep/{cep}': {
      get: {
        tags: ['Utilities'],
        summary: 'Consulta CEP via Axios',
        security: auth,
        parameters: [
          {
            name: 'cep',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '01001000' },
          },
        ],
        responses: {
          200: ok(
            'Consulta de CEP realizada',
            { $ref: '#/components/schemas/CepLookup' },
            'Consulta de CEP realizada com sucesso.'
          ),
          404: err('Nao encontrado', 'CEP nao encontrado.'),
        },
      },
    },
  },
});
