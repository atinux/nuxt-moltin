export default function ({ store, redirect }) {
  if (!store.state.connected) return redirect('/login')
}
