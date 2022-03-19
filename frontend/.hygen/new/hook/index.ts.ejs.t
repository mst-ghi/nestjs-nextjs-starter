---
to: <%= absPath %>/use<%= name %>.ts
---
const use<%= name %> = () => {
  return {
    //
  };
};

export type Use<%= name %>ReturnType = ReturnType<typeof use<%= name %>>;
export default use<%= name %>;
