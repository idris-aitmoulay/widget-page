import React from 'react';
import { render } from '@testing-library/react';
import { MapRoutes, PrivateRoute } from '../utils';
import type { RoutesProps } from "../utils";
import Dropdown from "../../../shared/components/DropDown";

jest.mock(
  "react-router-dom",
  (): any => {
    const Route = ({ render: RenderComponents, ...rest }) => (
        <div {...rest}>
          <RenderComponents />
        </div>
      );

    return {
      Route
    };
  },
);

describe('PrivateRoute && MapRoutes', () => {
  test('PrivateRoute snap-shot ', () => {
    const { container } = render(<PrivateRoute
      component={() => <div>component</div>}
      store={undefined}
      path={'/home'}
    />);
    expect(container).toMatchSnapshot();
  });

  test('MapRoutes snap-shot ', () => {
    const routes: RoutesProps[] = [
      {
        component: () => <div>home</div>,
        path: '/home',
        exact: true,
        access: 'public',
      },
      {
        component: () => <div>products</div>,
        path: '/products',
        exact: true,
        access: 'private',
      }
    ];

    const ProtectedLayout = ({ Component, ...props }) => <div role={'private'}><Component {...props}/></div>;
    const mapedRoutes: any[] = MapRoutes(routes, ProtectedLayout);
    const RenderedComponent = () => (
      <div>
        {mapedRoutes.map(({ component: Component }, index) => (<Component key={index}/>))}
      </div>
    );
    const { container } = render(<RenderedComponent />);
    expect(mapedRoutes.length).toBe(2);
    expect(container).toMatchSnapshot();
  });
});
