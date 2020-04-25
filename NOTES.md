# Culled from a Pluralsight class entitled "Angular NgRx: Getting Started."
- Blog:         https://blogs.msmvps.com/deborahk/angular-ngrx-getting-started-problem-solver/
- GitHub:       https://github.com/DeborahK/Angular-NgRx-GettingStarted
- Quick Fix:    https://stackoverflow.com/questions/60174503/job-name-getprojectmetadata-does-not-exist

``javascript
    npm install @ngrx/store
```

- Store:
    - Single container for application state.
    - Interact with that state in an immutable manner.
    - Install the @ngrx/store package.
    - Organize application state by feature.
    - name the feature slice with the feature name.
    - Initialize the store using:
        - StoreModule.forRoot(reducer) or StoreModule.forFeature('feature', reducer)

- Action:
    - An action represents an event.
    - Define an action for each event worth tracking.
    - Action is an object with a type and an optional payload:
    ```javascript
        { type: 'TYPE', payload: {} }
    ```

- Reducer:
    - Responds to dispatched actions.
    - Replaces the state tree with the new state.
    - Build a reducer function (often one or more per feature.)
    - Implement as a switch with a case per action:
    ```javascript
        export default function reducer(state, action) {
            switch (action.type) {
                return case 'TYPE':
                return { ...state, payload: action.payload };
            }
        }
    ```

- Dispatching an Action:
    - Often performed in a response to a user action or an operation.
    - Inject the stre in the constructor.
    - Call the dispatch method of the store.
    - Pass in the action to dispatch:
    ```javascript
        this.store.dispatch({
            type: 'TYPE',
            payload: payload
        })
    ```
    - Passed to all reducers.

- Subscribing to the Store:
    - Often performed in the ngOnInit lifecycle hook.
    - Inject the store in the constructor.
    - Use the store's select operator, passing in the desired slice of state.
    - Subscribe:
    ```javascript
        this.store.pipe(select('products')).subscribe(x => this.value = x.value );
    ```
    - Receives notifications when the state changes.

- Install the Redux Store Dev Tools:
    1. Install browser Redux DevTools extension.
    2. Install @ngrx/sotre-devtools. Initialize within a given module.
    ``javascript
        npm install @ngrx/store-devtools
    ```

- Strongly-typed state.
    - Beware lazy-loading at an application level. Instead, extend state with fromRoot.State...

- Benefits of selectors:
    - Provide a strongly-typed API.
    - Decouple the Store from the components.
    - Encapsulate complex data transformations.
    - Reuseable.
    - Memoized. (Cached.)
    1. Two types of Selectors:
        - createFeatureSelector:
        - createSelector: (Composing selectors.)
    ```javascript
        export const getCurrentProduct = createSelector(
            getProductFeatureState,
            getCurrentProductId,
            (state, currentProductId) => state.products.find(p => p.id === currentProductId)
        );
    ```
    - Define an interface for each slice of state.
    - Compose them for the global application state.
    - Use the interfaces to strongly type the state.

    - Building Selectors:
        - Build selectors to define reuseable state queries.
        - Conceptually similiar to stored procedures.
        - Create a feature selector.
        - Leverage the feature selector to obtain different state selectors.

- Building Action Creators in order to strongly-type Actions.
    - Three steps:
    1. Define the action types.
        - e.g.: Use an enum to specify the set of named constants.
        - e.g.: Specify clear action type strings.       
    2. Build an action creator.
        - e.g.: Define a class with type and payload properties.
        - e.g.: Use the action creator when dispatching the action.
    3. Union the action creators.
        - e.g.: Define a union type of all.
        - e.g.: Use this union type in the reducer.
    4. For more complex operations:
        - Define multiple actions.

- Asynchronous with effects.
    1. NgRx Effects Library: Manages side effects to keep components pure.
        - And do no manage side effects within reducers, either. Reducers are pure functions.
        - Effects take an action, perform some work, and then dispatch a new action.
    2. Bennefits of Effects:
        - Keep components pure.
        - Isolate side effects.
        - Easier to test (in isolation from the components that use them.)
    3. Defining effects:
        - A type of Angular service. (With @Injectable decorator.)
        - Inject an actions$ observeable.
        - Decorate a function with the @Effect() decorator.
        - NOTE: e.g.: loadProducts$ "This variable is an observeable."
    ```javascript
        npm install @ngrx/effects
    ```
    4. switchMap: 
        - Cancels the current (in flight) subscription/request and can cause a race condition.
        - Use for GET requests or cancellable requests like searches.
    5. concatMap:
        - Runs subscriptions/requests in order and is less performant. But safe.
        - Use for GET, POST, and PUT requests when order is important.
    5. mergeMap:
        - Runs subscriptions/requests in parallel.
        - Use for PUT, POST, and DELETE methods when order is not important.
    6. exhaustMap:
        - Ignores all subsequent subscriptions/requests until it completes.
        - Use for login when you do not want more requests until the initial request is complete.
    7. Registering an effect. Nothng on the bootstrap. Lazy-load with custom module.
    ```javascript
        @NgModule({
            imports: [
                EffectsModule.forRoot([])
            ]
        })
        @NgModule({
            imports: [
                EffectsModule.forFeature([Effects])
            ]
        })
    ```
    8. Using Effects:
        - Inject the store:
        - Call the dispatch method:
        - Select state with selector
        ```javascript
            constructor(private store: Store<fromProducts.State>)
            this.store.dispatch(new productAction.Load());
            this.store.pipe(select(fromProduct.getProducts)).subscribe(
                products: Products[]) => this.products = products
            );
        ```
- Unsubscribing from the store:
    ```javascript
        takeWhile(()=> this.active))
    ```
    1. Or, use the Async Pipe as it subscribes and unsubscribes for you.
    ```javascript
        this.products$ = this.store.pipe(select(fromProduct.getProducts));
        *ngFor="let product of products$ | async"
    ```
    2. When should you use the Asunc pipe versus subscribing in the component class?
        - When you need the observeables value within the class go ahead and subscribe.