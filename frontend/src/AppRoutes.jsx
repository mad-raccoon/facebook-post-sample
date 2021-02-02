import { useQuery } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  PostsPage,
  PostCategoriesPage,
  PostDetailsPage,
  NewPostPage,
} from "./components/features/Posts/pages";
import { servicePost } from "./shared/api";

const defaulSelectOption = { name: "all", path: "all" };

const NavigationHeader = () => {
  const history = useHistory();
  const location = useLocation();

  let { data: categories = [] } = useQuery(
    "post-categories",
    servicePost.getCategories
  );

  const handleSelection = (path) => {
    history.push(
      path === defaulSelectOption.path ? "/posts" : `/post-categories/${path}`
    );
  };

  // Add a default path for all posts
  categories = [defaulSelectOption, ...categories];

  // Can be improved...
  const isCategorySelected = (category) => {
    if (
      category.path === "all" &&
      !categories.some((c) => location.pathname.includes(`/${c.path}`))
    ) {
      return true;
    }

    if (
      category.path !== "all" &&
      location.pathname.includes(`/${category.path}`)
    ) {
      return true;
    }
  };

  return (
    <div className="navigationBar">
      {categories.map((category) => (
        <h3
          className={isCategorySelected(category) && "selected"}
          key={category.path}
          onClick={() => handleSelection(category.path)}
        >
          {category.name}
        </h3>
      ))}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Router>
        <NavigationHeader />
        <Switch>
          <Route path="/new-post">
            <NewPostPage />
          </Route>
          <Route path="/post-edit/:id">
            <PostDetailsPage />
          </Route>
          <Route path="/posts/:id">
            <PostDetailsPage />
          </Route>
          <Route path="/post-categories/:category">
            <PostCategoriesPage />
          </Route>
          <Route path="/posts">
            <PostsPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRoutes;
