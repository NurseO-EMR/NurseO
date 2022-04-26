import React from 'react';
import PageView from '../PageView';

export default class EditLocationsPage extends React.Component {

    render() {
        return (
            <PageView>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Station</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </PageView>

        );
    }
}