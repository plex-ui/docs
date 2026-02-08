import s from './PropsTable.module.css';

export type PropsTableRow = {
  prop: string;
  type: string;
  default?: string;
  description?: string;
};

export function PropsTable({ data }: { data: PropsTableRow[] }) {
  return (
    <div className={`${s.Wrapper} not-prose`}>
      <table className={s.Table}>
        <thead>
          <tr>
            <th className={s.ThProp}>Prop</th>
            <th className={s.ThType}>Type</th>
            <th className={s.ThDefault}>Default</th>
            <th className={s.ThDescription}>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.prop}>
              <td className={s.TdProp}>
                <code>{row.prop}</code>
              </td>
              <td className={s.TdType}>
                <code>{row.type}</code>
              </td>
              <td className={s.TdDefault}>
                {row.default != null ? <code>{row.default}</code> : '—'}
              </td>
              <td className={s.TdDescription}>{row.description ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
