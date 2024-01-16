const typeDefs = `
  type User {
    _id: ID!
    email: String!
    fixedExpenses: [FixedExpense]
    incomes: [Income]
  }
  
type FixedExpense {
    id: ID!
    description: String!
    amount: Float!
    frequency: String!
    dueDate: String
    category: String
    userId: ID!
  }

  input AddFixedExpenseInput {
    description: String
    amount: Float
    frequency: String
    dueDate: String
    category: String
    userId: ID!
  }

  input UpdateFixedExpenseInput {
    id: ID!
    description: String
    amount: Float
    frequency: String
    dueDate: String
    category: String
    userId: ID
  }

  type Income {
    user: User!
    source: String
    incomeAmount: Float
    frequency: String
  }

  input IncomeInput {
    source: String
    incomeAmount: Float
    frequency: String
  }

  type Query {
    users: [User]
    getUser(userId: ID!): User
    loadIncome(userId: ID!): [Income]
  }

  type Mutation {
    signout: String
    signup(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addIncomeSource(source: String!, incomeAmount: Float!): Income
    addFixedExpense(input: AddFixedExpenseInput!): FixedExpense
    updateFixedExpense(input: UpdateFixedExpenseInput!): FixedExpense
    deleteFixedExpense(id: ID!): String
}

  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs;


