export default function ({ Plugin, types: t }) {
  return new Plugin("react-class-display-name", {
    visitor: {
      ClassDeclaration(node, parent, scope, file) {
          const superClass = this.get("superClass");
          if (superClass.matchesPattern("React.Component") || superClass.matchesPattern("React.PureComponent")) {
              (parent.type === 'ExportDefaultDeclaration' ? this.parentPath : this).insertAfter([ // take the "export default class ..." form into account
                  t.expressionStatement(t.assignmentExpression(
                      "=",
                      t.memberExpression(node.id, t.identifier("displayName")),
                      t.literal(node.id.name)
                  ))
              ]);
          }
      }
    }
  });
}
