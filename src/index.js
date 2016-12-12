export default function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
          const superClass = path.get("superClass");
          if (superClass.matchesPattern("React.Component") || superClass.matchesPattern("React.PureComponent")) {
              const body = path.get('body');
              body.pushContainer('body', t.classProperty(t.identifier("displayName"), t.stringLiteral(path.node.id.name)));
          }
      }
    }
  };
}
